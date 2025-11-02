import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
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
