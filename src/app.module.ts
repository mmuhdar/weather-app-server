import { Module } from '@nestjs/common';
import { HistoryModule } from './history/history.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [HistoryModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
