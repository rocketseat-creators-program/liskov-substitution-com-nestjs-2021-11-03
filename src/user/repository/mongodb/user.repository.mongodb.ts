import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from '../user.repository.abstract';
import { User as UserSchema } from './user.schema';

@Injectable()
export class UserRepositoryMongodb extends UserRepository {
  @InjectModel(UserSchema.name)
  private model: Model<UserSchema>;

  find(id: string): Promise<User> {
    return this.model.findOne({ id }).then(this.userModelToUserEntity);
  }

  create(user: User): Promise<User> {
    return this.model.create(user).then(this.userModelToUserEntity);
  }

  findAll(): Promise<User[]> {
    return this.model.find().then((e) => e.map(this.userModelToUserEntity));
  }

  update(id: string, updateUserDto: Partial<User>): Promise<User> {
    return this.model
      .findOneAndUpdate({ id }, { $set: updateUserDto }, { new: true })
      .then(this.userModelToUserEntity);
  }

  async remove(id: string): Promise<void> {
    await this.model.deleteOne({ id });
  }

  private userModelToUserEntity(
    userDoc: Document<any, any, UserSchema> &
      UserSchema & {
        _id: Types.ObjectId;
      },
  ): User {
    return new User(userDoc);
  }
}
