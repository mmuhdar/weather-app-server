import { IsNotEmpty, IsString } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  @IsString()
  city: string;
}
