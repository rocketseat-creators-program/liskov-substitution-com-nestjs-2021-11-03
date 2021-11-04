import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export abstract class UserRepository {
  abstract remove(id: string): Promise<void>;
  abstract find(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract create(user: User): Promise<User>;
  abstract update(id: string, updateUserDto: Partial<User>): Promise<User>;
}
