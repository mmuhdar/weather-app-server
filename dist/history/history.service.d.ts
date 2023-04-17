import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseHistory, ResponseHistories } from './interface';
import { QueryDto } from './dto';
export declare class HistoryService {
    private prisma;
    constructor(prisma: PrismaService);
    checkCity(city: string): Promise<any>;
    createHistory(dto: QueryDto): Promise<ResponseHistory>;
    findAllHistory(): Promise<ResponseHistories>;
}
