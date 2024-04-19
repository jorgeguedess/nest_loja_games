import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_categoria' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  // Tipo ['Xbox One','PlayStation 5','PlayStation 4','Nintendo Switch']
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  tipo: string;

  // Tipo ['xbox','ps5','ps4','nintendo-switch']
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  slug: string;

  // Genero ['ação','aventura','luta','esporte','rpg']
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  genero: string;
}
