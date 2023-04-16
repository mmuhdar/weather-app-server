import { History } from '@prisma/client';
import { Status } from '../enum';

export interface ResponseCreateHistory {
  status: Status;
  message: string;
  data?: History;
}
