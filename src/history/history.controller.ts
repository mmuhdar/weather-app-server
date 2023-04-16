import { Body, Controller, Get, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { QueryDto } from './dto';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  findAllHistory() {
    return this.historyService.findAllHistory();
  }

  @Post()
  checkCity(@Body() dto: QueryDto) {
    return this.historyService.createHistory(dto);
  }
}
