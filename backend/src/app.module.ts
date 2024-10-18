// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL, // Use the environment variable for the connection URL
      entities: [Book],
      synchronize: true,
      ssl: process.env.POSTGRES_URL.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : false,
    }),
    BooksModule,
  ],
})
export class AppModule {}
