import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaDefinition } from 'src/core/persistence/schema.definition';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  email: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export const schema = new SchemaDefinition(User, UserSchema);
