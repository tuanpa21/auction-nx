import { IsSwaggerNumber } from '@jitera/common';

export class WalletDepositDto {
  @IsSwaggerNumber({ minimum: 0 })
  amount: number;
}
