// Importa variaveis de ambients .env
import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';

import { Categoria } from './categoria/entities/categoria.entity';
import { ProdutoModule } from './produto/produto.module';
import { Produto } from './produto/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'db_lojagames',
      entities: [Categoria, Produto],
      synchronize: true,
    }),
    CategoriaModule,
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
