import objectOmit from '@/helpers/objectOmit';
import type { Document, Query } from 'mongoose';
import type { IApiFeatures } from '@/interfaces/apiFeatures';

class ApiFeatures<T extends Document> implements IApiFeatures<T> {
  public query: Query<T[], T>;
  public queryObject: Record<string, unknown>;

  constructor(query: Query<T[], T>, queryObject: Record<string, unknown>) {
    this.query = query;
    this.queryObject = queryObject;
  }

  filter(): ApiFeatures<T> {
    const queryObject = objectOmit({ ...this.queryObject }, [
      'sort',
      'fields',
      'limit',
      'page',
    ]);

    void this.query.find(queryObject);

    return this;
  }

  sort(): ApiFeatures<T> {
    if ('sort' in this.queryObject) {
      const sortBy = (this.queryObject.sort as string).split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(): ApiFeatures<T> {
    if ('fields' in this.queryObject) {
      const fields = (this.queryObject.fields as string).split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate(): ApiFeatures<T> {
    const page =
      'page' in this.queryObject ? +(this.queryObject.page as string) : 1;
    const limit =
      'limit' in this.queryObject ? +(this.queryObject.limit as string) : 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  execute(): ApiFeatures<T> {
    this.filter().sort().limitFields().paginate();

    return this;
  }
}

export default ApiFeatures;
