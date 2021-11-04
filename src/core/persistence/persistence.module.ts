import {
  DynamicModule,
  FactoryProvider,
  Global,
  Module,
  Type,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MemorydbModule } from './memorydb/memorydb.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { SchemaDefinition } from './schema.definition';

export enum PersistenceType {
  MONGO = 'MONGO',
  MEMORY = 'MEMORY',
}

export const PERSISTENCE_TYPE = 'PERSISTENCE_TYPE';

@Global()
@Module({})
export class PersistenceModule {
  static forRoot(persistenceType: PersistenceType): any {
    return persistenceType === PersistenceType.MONGO
      ? {
          module: PersistenceModule,
          imports: [MongodbModule],
          providers: [
            {
              provide: PERSISTENCE_TYPE,
              useValue: PersistenceType.MONGO,
            },
          ],
          exports: [PERSISTENCE_TYPE],
        }
      : {
          module: PersistenceModule,
          providers: [
            {
              provide: PERSISTENCE_TYPE,
              useValue: PersistenceType.MEMORY,
            },
          ],
          exports: [PERSISTENCE_TYPE],
        };
  }

  static forFeature(schemas: SchemaDefinition[]): DynamicModule {
    if (process.env.PERSISTENCE === PersistenceType.MONGO) {
      return MongooseModule.forFeature(
        schemas.map((e) => ({ name: e.type.name, schema: e.schema })),
      );
    }

    return MemorydbModule.forFeature(schemas);
  }

  static repository(
    type: any,
    obj: { mongodb: Type; memorydb: Type },
  ): FactoryProvider {
    return {
      provide: type,
      inject: [PERSISTENCE_TYPE, ModuleRef],
      useFactory: (pType: PersistenceType, moduleRef: ModuleRef) => {
        if (pType === PersistenceType.MONGO)
          return moduleRef.create(obj.mongodb);
        return moduleRef.create(obj.memorydb);
      },
    };
  }
}
