import {Entity, model, property} from '@loopback/repository';

@model()
export class Palabra extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Palabra>) {
    super(data);
  }
}

export interface PalabraRelations {
  // describe navigational properties here
}

export type PalabraWithRelations = Palabra & PalabraRelations;
