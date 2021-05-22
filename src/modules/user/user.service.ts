import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async createUser(data: UserDto): Promise<User> {
    const user = await this.userRepository.create<User>(<User>data);
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne<User>({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne<User>({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
