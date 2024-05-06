import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Produto } from '../../produto/entities/produto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  public nome: string;

  @ApiProperty({ example: 'email@email.com.br' })
  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  public usuario: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  public senha: string;

  @ApiProperty()
  @Column({ length: 5000 })
  public foto: string;

  @ApiProperty()
  @OneToMany(() => Produto, (produto) => produto.usuario)
  produto: Produto[];
}
