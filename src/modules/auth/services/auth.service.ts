import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { CryptHelper } from 'src/common/helpers/crypt.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(payload: LoginDto) {
    const result = await this.userService.findByEmail(payload.email);
    const isValidPassword = await CryptHelper.compare(
      payload.password,
      result?.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('wrong password.');
    }
    return {
      accessToken: this.jwtService.sign(result, {
        expiresIn: '1d',
      }),
    };
  }
  async findById(id: string) {
    return await this.userService.findOne(id);
  }
}
