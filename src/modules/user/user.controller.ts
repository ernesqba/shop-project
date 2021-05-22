import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findOneByEmail(@Query('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }
}
