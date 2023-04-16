import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { ResponseCreateHistory } from './interface';
import { Status } from './enum';
import { QueryDto } from './dto';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async checkCity(city: string): Promise<any> {
    try {
      const instance = axios.create({
        baseURL: 'http://api.weatherapi.com/v1',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          key: process.env.WEATHER_API_KEY,
        },
      });
      const { data } = await instance.get(`/current.json?q=${city}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createHistory(dto: QueryDto): Promise<ResponseCreateHistory> {
    try {
      const { city } = dto;
      const check = await this.checkCity(city.toLocaleLowerCase());
      const data = await this.prisma.history.create({
        data: {
          input: city,
          response: JSON.stringify(check),
        },
      });
      return {
        status: Status.SUCCESS,
        message: 'Success get data',
        data: {
          ...data,
          response: check,
        },
      };
    } catch (error) {
      if (error.name == 'AxiosError') {
        const code = error.response.data.error.code;
        switch (code) {
          case 1003:
            throw new BadRequestException('Input can not be empty');
          case 1006:
            throw new NotFoundException('Not Found');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
