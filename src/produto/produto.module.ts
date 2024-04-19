import { Module } from '@nestjs/common';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controllers/produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}
