import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';

// Importa variaveis de ambients .env
import * as dotenv from 'dotenv';
import { Categoria } from './categoria/entities/categoria.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'db_lojagames',
      entities: [Categoria],
      synchronize: true,
    }),
    CategoriaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
