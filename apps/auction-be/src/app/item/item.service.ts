import { createPaginator } from 'prisma-pagination'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '@jitera/prisma'
import { ConfigService } from '@nestjs/config'
import { IUserJwt } from '@jitera/common'
import { ItemCreateDto, ItemQueryDto, ItemUpdateDto } from './item.validation'
import { Item, Prisma } from '@prisma/client'
import { BadRequestException } from '@nestjs/common'

@Injectable()
export class ItemService {
  private readonly paginate = createPaginator({ perPage: 10 })
  private readonly logger = new Logger(ItemService.name)

  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {}

  async getAll(info: IUserJwt, query: ItemQueryDto) {
    return this.paginate<Item, Prisma.ItemFindManyArgs>(this.prisma.item, {
      include: { auctions: { take: 1 } },
      orderBy: query.sort ? { [query.sort[0]]: query.sort[1] } : { createdAt: 'desc' },
    })
  }

  async getOne(info: IUserJwt, id: string) {
    return this.prisma.item.findUnique({ where: { id }, include: { auctions: { take: 10 } } })
  }

  async create(info: IUserJwt, data: ItemCreateDto) {
    return this.prisma.item.create({
      data: {
        name: data.name,
        cost: data.cost,
        expiredAt: data.expiredAt,
        userId: info.sub,
      },
    })
  }

  async update(info: IUserJwt, id: string, data: ItemUpdateDto) {
    const [item, wallet] = await Promise.all([
      this.getOne(info, id),
      this.prisma.wallet.findUnique({ where: { userId: info.sub }, select: { amount: true } }),
    ])
    const lastAuc = item.auctions[0]

    if (item.cost >= data.cost) throw new BadRequestException(`The price must be larger`)
    if (item.userId === info.sub) throw new BadRequestException(`The owner can't join yourself item auction`)
    if (item.status === 'COMPLETE') throw new BadRequestException(`The auction has been done`)
    if (wallet.amount < data.cost) throw new BadRequestException(`You not have enough money to continue`)
    if (lastAuc && lastAuc.userId === info.sub) throw new BadRequestException(`You are the last auctioneer`)

    const [result] = await this.prisma.$transaction([
      this.prisma.item.update({
        where: { id },
        data: { cost: data.cost, auctions: { create: { userId: info.sub, cost: data.cost } } }, //update last price
      }),
      this.prisma.wallet.update({ where: { userId: info.sub }, data: { amount: { decrement: data.cost } } }), // decrease money new auc
      lastAuc && // refund money last auc
        this.prisma.wallet.update({
          where: { userId: item.auctions[0].userId },
          data: { amount: { increment: data.cost } },
        }),
    ])
    return result
  }

  async delete(info: IUserJwt, id: string) {
    const item = await this.getOne(info, id)
    if (item.auctions.length) throw new BadRequestException(`The auction has the auctioneer`)
    if (item.userId !== info.sub) throw new BadRequestException(`Only the owner can remove item`)

    return this.prisma.item.delete({ where: { id } })
  }
}
