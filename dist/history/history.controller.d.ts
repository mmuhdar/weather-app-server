import { HistoryService } from './history.service';
import { QueryDto } from './dto';
export declare class HistoryController {
    private historyService;
    constructor(historyService: HistoryService);
    findAllHistory(): Promise<import("./interface").ResponseHistories>;
    checkCity(dto: QueryDto): Promise<import("./interface").ResponseHistory>;
}
