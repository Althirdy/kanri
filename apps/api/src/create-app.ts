import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module.js';

// Shared by main.ts and the tests, so both use the same /api prefix.
export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
  app.setGlobalPrefix('api');
  return app;
}
