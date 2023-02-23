import {
  IRequest,
  ApiPaginateRes,
  ApiPassedRes,
} from '@auction-nx/server/common';
import { IsAuthController } from '@jitera/guard';
import {
  Body,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ItemModelRes } from './item.response';
import { ItemService } from './item.service';
import { ItemCreateDto, ItemQueryDto, ItemUpdateDto } from './item.validation';

@IsAuthController('items', 'items')
export class ItemController {
  private readonly logger = new Logger(ItemController.name);

  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiPaginateRes(ItemModelRes)
  getAll(@Req() req: IRequest, @Query() query: ItemQueryDto) {
    return this.itemService.getAll(req.user, query);
  }

  @Get(':id')
  @ApiPassedRes(ItemModelRes, HttpStatus.OK)
  getOne(@Req() req: IRequest, @Param('id') id: string) {
    return this.itemService.getOne(req.user, id);
  }

  @Post()
  @ApiPassedRes(ItemModelRes, HttpStatus.CREATED)
  create(@Req() req: IRequest, @Body() data: ItemCreateDto) {
    return this.itemService.create(req.user, data);
  }

  @Put(':id')
  @ApiPassedRes(ItemModelRes, HttpStatus.OK)
  update(
    @Req() req: IRequest,
    @Param('id') id: string,
    @Body() data: ItemUpdateDto
  ) {
    return this.itemService.update(req.user, id, data);
  }

  @Delete(':id')
  @ApiPassedRes(ItemModelRes, HttpStatus.OK)
  delete(@Req() req: IRequest, @Param('id') id: string) {
    return this.itemService.delete(req.user, id);
  }
}
