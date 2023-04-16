import { Body, Controller, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { QueryDto } from './dto';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Post()
  checkCity(@Body() dto: QueryDto) {
    return this.historyService.createHistory(dto);
  }
}
