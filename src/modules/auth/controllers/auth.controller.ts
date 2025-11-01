import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Public()
  @Post()
  async login(@Body() dto: LoginDto) {
    return await this.service.login(dto);
  }
}
