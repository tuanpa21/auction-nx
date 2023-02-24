import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@auction-nx/server/prisma';
import { ConfigService } from '@nestjs/config';
import { IUserJwt } from '@auction-nx/server/common';
import { WalletDepositDto } from './wallet.validation';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async update(info: IUserJwt, id: string, data: WalletDepositDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: info.sub },
      include: { wallet: true },
    });
    if (!user) throw new BadRequestException('User not found');
    if (!user.wallet) {
      return this.create(info, data);
    }

    return this.prisma.wallet.update({
      where: { id: user.wallet.id },
      data: { amount: { increment: data.amount } },
    });
  }

  async create(info: IUserJwt, data: WalletDepositDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: info.sub },
      include: { wallet: true },
    });
    if (!user) throw new BadRequestException('User not found');
    if (user.wallet) {
      throw new BadRequestException('User had wallet already');
    }

    return this.prisma.wallet.create({
      data: {
        amount: data.amount,
        userId: info.sub,
      },
    });
  }
}
