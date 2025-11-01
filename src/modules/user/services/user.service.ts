import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { CryptHelper } from 'src/common/helpers/crypt.helper';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`userId ${id} not found`);
    }
    return user;
  }
  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`email ${email} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error interno del servidor',
      );
    }
  }
  async create(createUserDto: CreateUserDto): Promise<BaseResponseDto> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new InternalServerErrorException('email already in use');
    }
    const password = createUserDto.password;
    const hashedPassword = await CryptHelper.hashPassword(password);
    await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const response = new BaseResponseDto();
    response.message = 'usuario creado';
    response.isSuccess = true;
    return response;
  }
}
