import { Module } from '@nestjs/common';
import { HistoryModule } from './history/history.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HistoryModule, PrismaModule],
})
export class AppModule {}
