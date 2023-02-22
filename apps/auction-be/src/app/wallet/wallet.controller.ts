import { IRequest, ApiPassedRes } from '@jitera/common';
import { IsAuthController } from '@jitera/guard';
import { Body, HttpStatus, Logger, Param, Post, Put, Req } from '@nestjs/common';
import { WalletModelRes } from './wallet.response';
import { WalletService } from './wallet.service';
import { WalletDepositDto } from './wallet.validation';

@IsAuthController('wallets', 'wallets')
export class WalletController {
  private readonly logger = new Logger(WalletController.name);

  constructor(private readonly walletService: WalletService) {}

  @Put(':id/deposits')
  @ApiPassedRes(WalletModelRes, HttpStatus.OK)
  update(@Req() req: IRequest, @Param('id') id: string, @Body() data: WalletDepositDto) {
    return this.walletService.update(req.user, id, data);
  }

  @Post('/deposits')
  @ApiPassedRes(WalletModelRes, HttpStatus.OK)
  create(@Req() req: IRequest, @Body() data: WalletDepositDto) {
    return this.walletService.create(req.user, data);
  }
}
