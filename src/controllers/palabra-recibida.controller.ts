import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {PalabraRecibida} from '../models';
import {PalabraRecibidaRepository} from '../repositories';

export class PalabraRecibidaController {
  constructor(
    @repository(PalabraRecibidaRepository)
    public palabraRecibidaRepository : PalabraRecibidaRepository,
  ) {}

  @post('/api/palabraRecibida', {
    responses: {
      '200': {
        description: 'PalabraRecibida model instance',
        content: {'application/json': {schema: getModelSchemaRef(PalabraRecibida)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalabraRecibida, {
            title: 'NewPalabraRecibida',
            exclude: ['id'],
          }),
        },
      },
    })
    palabraRecibida: Omit<PalabraRecibida, 'id'>,
  ): Promise<PalabraRecibida> {
    return this.palabraRecibidaRepository.create(palabraRecibida);
  }

  @get('/api/palabraRecibida/count', {
    responses: {
      '200': {
        description: 'PalabraRecibida model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PalabraRecibida)) where?: Where<PalabraRecibida>,
  ): Promise<Count> {
    return this.palabraRecibidaRepository.count(where);
  }

  public testvar:PalabraRecibida;
  @get('/api/palabraRecibida/last', {
    responses: {
      '200': {
        description: 'Palabra model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PalabraRecibida, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findLast(
    @param.query.object('filter', getFilterSchemaFor(PalabraRecibida)) filter?: Filter<PalabraRecibida>,
  ): Promise<PalabraRecibida> {
    (await this.palabraRecibidaRepository.find(filter)).forEach ((value) =>{
      this.testvar=value;
    });
    //console.log(this.testvar);
    return this.testvar;
  }

  @get('/api/palabraRecibida', {
    responses: {
      '200': {
        description: 'Array of PalabraRecibida model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PalabraRecibida, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PalabraRecibida)) filter?: Filter<PalabraRecibida>,
  ): Promise<PalabraRecibida[]> {
    return this.palabraRecibidaRepository.find(filter);
  }

  @patch('/api/palabraRecibida', {
    responses: {
      '200': {
        description: 'PalabraRecibida PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalabraRecibida, {partial: true}),
        },
      },
    })
    palabraRecibida: PalabraRecibida,
    @param.query.object('where', getWhereSchemaFor(PalabraRecibida)) where?: Where<PalabraRecibida>,
  ): Promise<Count> {
    return this.palabraRecibidaRepository.updateAll(palabraRecibida, where);
  }

  @get('/api/palabraRecibida/{id}', {
    responses: {
      '200': {
        description: 'PalabraRecibida model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PalabraRecibida, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(PalabraRecibida)) filter?: Filter<PalabraRecibida>
  ): Promise<PalabraRecibida> {
    return this.palabraRecibidaRepository.findById(id, filter);
  }

  @patch('/api/palabraRecibida/{id}', {
    responses: {
      '204': {
        description: 'PalabraRecibida PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalabraRecibida, {partial: true}),
        },
      },
    })
    palabraRecibida: PalabraRecibida,
  ): Promise<void> {
    await this.palabraRecibidaRepository.updateById(id, palabraRecibida);
  }

  @put('/api/palabraRecibida/{id}', {
    responses: {
      '204': {
        description: 'PalabraRecibida PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() palabraRecibida: PalabraRecibida,
  ): Promise<void> {
    await this.palabraRecibidaRepository.replaceById(id, palabraRecibida);
  }

  @del('/api/palabraRecibida/{id}', {
    responses: {
      '204': {
        description: 'PalabraRecibida DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.palabraRecibidaRepository.deleteById(id);
  }
}
