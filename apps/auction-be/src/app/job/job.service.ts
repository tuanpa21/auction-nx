import { PrismaService } from '@auction-nx/server/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { addHours } from 'date-fns';
import { Item } from '@prisma/client';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Every hour run a job to counting all item auction has expired in next hours
   * Run counting time to the end and update status to COMPLETE and closed the auction
   */
  @Cron(CronExpression.EVERY_HOUR)
  async completedAuction() {
    const items = await this.prisma.item.findMany({
      where: { expiredAt: { gte: new Date(), lte: addHours(new Date(), 1) } },
    });
    this.logger.log(`We have ${items.length} items will be finished auction`);

    const updateItem = (item: Item) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          this.prisma.item
            .update({ where: { id: item.id }, data: { status: 'COMPLETE' } })
            .then((response: Item) => {
              this.logger.log(
                `item ${response.id} has been updated status to ${item.status}!`
              );
              return resolve(true);
            })
            .catch((error) => {
              this.logger.error(
                `item ${item.id} has been updated failed`,
                JSON.stringify(error)
              );
              return reject(false);
            });
        }, Math.abs(item.expiredAt.getTime() - Date.now()))
      );
    if (items.length) items.forEach(updateItem);
  }
}
