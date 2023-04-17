import { History } from '@prisma/client';
import { Status } from '../enum';
export interface ResponseHistory {
    status: Status;
    message: string;
    data?: History;
}
export interface ResponseHistories {
    status: Status;
    message: string;
    data?: History[];
}
