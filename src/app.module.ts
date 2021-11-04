import { Module } from '@nestjs/common';
import {
  PersistenceModule,
  PersistenceType,
} from './core/persistence/persistence.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    PersistenceModule.forRoot(process.env.PERSISTENCE as PersistenceType),
  ],
})
export class AppModule {}
