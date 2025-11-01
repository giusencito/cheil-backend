/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/common/helpers/constant.helper';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private service: AuthService,
    private readonly configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>(JWT_SECRET);
    if (!jwtSecret) {
      throw new BadRequestException(
        'JWT secret is not defined in configuration',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    return await this.service.findById(payload.id);
  }
}
