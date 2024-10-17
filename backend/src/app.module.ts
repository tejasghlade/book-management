// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql'
      host: 'localhost',
      port: 5432, // or 3306 for MySQL
      username: 'tejas',
      password: 'tejas@1234',
      database: 'book',
      entities: [Book],
      synchronize: true,
      logging: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}
