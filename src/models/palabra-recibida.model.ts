import {Entity, model, property} from '@loopback/repository';

@model()
export class PalabraRecibida extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<PalabraRecibida>) {
    super(data);
  }
}

export interface PalabraRecibidaRelations {
  // describe navigational properties here
}

export type PalabraRecibidaWithRelations = PalabraRecibida & PalabraRecibidaRelations;
