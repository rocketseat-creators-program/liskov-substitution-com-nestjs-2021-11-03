import { Type } from '@nestjs/common';
import { Schema } from 'mongoose';

export class SchemaDefinition {
  constructor(public type: Type, public schema: Schema) {}
}
