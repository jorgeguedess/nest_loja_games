import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Produto } from '../../produto/entities/produto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  // Tipo ['Xbox One','PlayStation 5','PlayStation 4','Nintendo Switch']
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  tipo: string;

  // Slug ['xbox','ps5','ps4','nintendo-switch']
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  slug: string;

  // Genero ['ação','aventura','luta','esporte','rpg']
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  genero: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto[];
}
