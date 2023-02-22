import { Module } from '@nestjs/common'
import { JobService } from './job.service'
@Module({
  imports: [],
  exports: [JobService],
  providers: [JobService],
})
export class JobModule {}
