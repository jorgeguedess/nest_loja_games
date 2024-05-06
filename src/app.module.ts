import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';

import { Categoria } from './categoria/entities/categoria.entity';
import { ProdutoModule } from './produto/produto.module';
import { Produto } from './produto/entities/produto.entity';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'db_lojagames',
      entities: [Categoria, Produto, Usuario],
      synchronize: true,
    }),
    CategoriaModule,
    ProdutoModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
