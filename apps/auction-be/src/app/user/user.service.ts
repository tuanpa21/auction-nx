import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '@jitera/prisma'
import { ConfigService } from '@nestjs/config'
import { IUserJwt } from '@jitera/common'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {}

  async getInfo(info: IUserJwt) {
    const user = await this.prisma.user.findUnique({ where: { id: info.sub }, include: { wallet: true } })

    if (user.password) delete user.password

    return user
  }
}
