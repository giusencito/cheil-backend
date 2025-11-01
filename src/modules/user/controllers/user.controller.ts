import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  findEmail(@Param('email') email: string) {
    return this.service.findByEmail(email);
  }
  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.service.create(dto);
  }
}
