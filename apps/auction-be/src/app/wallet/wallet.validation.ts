import { IsSwaggerNumber } from '@auction-nx/server/common';

export class WalletDepositDto {
  @IsSwaggerNumber({ minimum: 0 })
  amount: number;
}
