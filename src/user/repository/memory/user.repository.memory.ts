import { Injectable } from '@nestjs/common';
import { InjectMemoryDBCollection } from 'src/core/persistence/memorydb/memorydb.provider';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from '../user.repository.abstract';

@Injectable()
export class UserRepositoryMemory extends UserRepository {
  @InjectMemoryDBCollection(User)
  private model: User[];

  async find(id: string): Promise<User> {
    return this.model.find((e) => e.id === id);
  }

  async create(user: User): Promise<User> {
    this.model.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.model;
  }

  async remove(id: string): Promise<void> {
    this.model = this.model.filter((e) => e.id !== id);
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = this.model.find((e) => e.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
      return user;
    }
    return null;
  }
}
