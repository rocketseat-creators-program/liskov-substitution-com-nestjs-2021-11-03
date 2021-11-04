import { Module } from '@nestjs/common';
import { PersistenceModule } from '../core/persistence/persistence.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { schema as UserSchema } from './repository/mongodb/user.schema';
import { UserRepository } from './repository/user.repository.abstract';
import { UserRepositoryMemory } from './repository/memory/user.repository.memory';
import { UserRepositoryMongodb } from './repository/mongodb/user.repository.mongodb';

@Module({
  imports: [PersistenceModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    UserService,
    PersistenceModule.repository(UserRepository, {
      mongodb: UserRepositoryMongodb,
      memorydb: UserRepositoryMemory,
    }),
  ],
})
export class UserModule {}
