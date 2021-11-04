import { DynamicModule, Module } from '@nestjs/common';
import { SchemaDefinition } from '../schema.definition';
import { createCollectionToken } from './memorydb.provider';

@Module({})
export class MemorydbModule {
  static forFeature(schema: SchemaDefinition[]): DynamicModule {
    return {
      module: MemorydbModule,
      providers: schema.map((e) => ({
        provide: createCollectionToken(e.type),
        useValue: [],
      })),
      exports: schema.map((e) => createCollectionToken(e.type)),
    };
  }
}
