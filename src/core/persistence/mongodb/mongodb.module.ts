import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const CONNECTION = MongooseModule.forRoot(process.env.MONGODB_URI);

@Module({
  imports: [CONNECTION],
  exports: [CONNECTION],
})
export class MongodbModule {}
