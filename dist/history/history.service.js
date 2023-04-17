"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("axios");
const enum_1 = require("./enum");
let HistoryService = class HistoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkCity(city) {
        try {
            const instance = axios_1.default.create({
                baseURL: 'http://api.weatherapi.com/v1',
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                    key: process.env.WEATHER_API_KEY,
                },
            });
            const { data } = await instance.get(`/current.json?q=${city}`);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async createHistory(dto) {
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
                status: enum_1.Status.SUCCESS,
                message: 'Success get data',
                data: Object.assign(Object.assign({}, data), { response: check }),
            };
        }
        catch (error) {
            if (error.name == 'AxiosError') {
                const code = error.response.data.error.code;
                switch (code) {
                    case 1003:
                        throw new common_1.BadRequestException('Input can not be empty');
                    case 1006:
                        throw new common_1.NotFoundException('Not Found');
                }
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async findAllHistory() {
        try {
            const data = await this.prisma.history.findMany();
            const newData = data.map((el) => {
                return Object.assign(Object.assign({}, el), { response: JSON.parse(el.response) });
            });
            return {
                status: enum_1.Status.SUCCESS,
                message: 'Success get data',
                data: newData,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map