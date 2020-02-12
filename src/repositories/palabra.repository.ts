import {DefaultCrudRepository} from '@loopback/repository';
import {Palabra, PalabraRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PalabraRepository extends DefaultCrudRepository<
  Palabra,
  typeof Palabra.prototype.id,
  PalabraRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Palabra, dataSource);
  }
}
