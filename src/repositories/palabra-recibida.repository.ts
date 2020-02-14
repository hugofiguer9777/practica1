import {DefaultCrudRepository} from '@loopback/repository';
import {PalabraRecibida, PalabraRecibidaRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PalabraRecibidaRepository extends DefaultCrudRepository<
  PalabraRecibida,
  typeof PalabraRecibida.prototype.id,
  PalabraRecibidaRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(PalabraRecibida, dataSource);
  }
}
