import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  exports: [WalletService],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
