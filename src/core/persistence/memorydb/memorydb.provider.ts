import { Inject, Type } from '@nestjs/common';

export const createCollectionToken = (type: Type) => `MEMORY_DB_${type.name}`;

export const InjectMemoryDBCollection = (type: Type) =>
  Inject(createCollectionToken(type));
