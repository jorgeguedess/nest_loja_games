import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findByUsuario(objetoUsuario: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: objetoUsuario,
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        produto: true,
      },
    });

    if (!usuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async create(objetoUsuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(objetoUsuario.usuario);

    if (!buscaUsuario) {
      if (!objetoUsuario.foto)
        objetoUsuario.foto = 'https://i.imgur.com/Sk5SjWE.jpg';

      objetoUsuario.senha = await this.bcrypt.criptografarSenha(
        objetoUsuario.senha,
      );

      return await this.usuarioRepository.save(objetoUsuario);
    }

    throw new HttpException('O Usuario ja existe!', HttpStatus.BAD_REQUEST);
  }

  async update(objetoUsuario: Usuario): Promise<Usuario> {
    const updateUsuario: Usuario = await this.findById(objetoUsuario.id);
    const buscaUsuario = await this.findByUsuario(objetoUsuario.usuario);

    if (!updateUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    if (buscaUsuario && buscaUsuario.id !== objetoUsuario.id)
      throw new HttpException(
        'Usuário (e-mail) já Cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    if (!objetoUsuario.foto)
      objetoUsuario.foto = 'https://i.imgur.com/Sk5SjWE.jpg';

    objetoUsuario.senha = await this.bcrypt.criptografarSenha(
      objetoUsuario.senha,
    );
    return await this.usuarioRepository.save(objetoUsuario);
  }
}
