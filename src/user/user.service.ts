import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository.abstract';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(new User(createUserDto));
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.find(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.remove(id);
  }
}
