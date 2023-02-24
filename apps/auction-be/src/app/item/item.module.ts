import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [],
  exports: [ItemService],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
