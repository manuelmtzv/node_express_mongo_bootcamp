import type { Query, Document } from 'mongoose';

export interface IApiFeatures<T extends Document> {
  query: Query<T[], T>;
  queryObject: Record<string, unknown>;
}
