import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const configService = new ConfigService();

export const dataBaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
};
