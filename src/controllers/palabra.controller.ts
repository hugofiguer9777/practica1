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
import {Palabra} from '../models';
import {PalabraRepository} from '../repositories';

export class PalabraController {
  constructor(
    @repository(PalabraRepository)
    public palabraRepository : PalabraRepository,
  ) {}

  @post('/api/palabras', {
    responses: {
      '200': {
        description: 'Palabra model instance',
        content: {'application/json': {schema: getModelSchemaRef(Palabra)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Palabra, {
            title: 'NewPalabra',
            exclude: ['id'],
          }),
        },
      },
    })
    palabra: Omit<Palabra, 'id'>,
  ): Promise<Palabra> {
    return this.palabraRepository.create(palabra);
  }

  @get('/api/palabras/count', {
    responses: {
      '200': {
        description: 'Palabra model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Palabra)) where?: Where<Palabra>,
  ): Promise<Count> {
    return this.palabraRepository.count(where);
  }

  @get('/api/palabras', {
    responses: {
      '200': {
        description: 'Array of Palabra model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Palabra, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Palabra)) filter?: Filter<Palabra>,
  ): Promise<Palabra[]> {
    return this.palabraRepository.find(filter);
  }

  public palabra:Palabra;
  @get('/api/palabras/last', {
    responses: {
      '200': {
        description: 'Palabra model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Palabra, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findLast(
    @param.query.object('filter', getFilterSchemaFor(Palabra)) filter?: Filter<Palabra>,
  ): Promise<Palabra> {
    (await this.palabraRepository.find(filter)).forEach ((value) =>{
      this.palabra=value;
    });
    
    if(this.palabra != null){
      delete this.palabra.id; 
    }
    return this.palabra;
  }

  @patch('/api/palabras', {
    responses: {
      '200': {
        description: 'Palabra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Palabra, {partial: true}),
        },
      },
    })
    palabra: Palabra,
    @param.query.object('where', getWhereSchemaFor(Palabra)) where?: Where<Palabra>,
  ): Promise<Count> {
    return this.palabraRepository.updateAll(palabra, where);
  }

  @get('/api/palabras/{id}', {
    responses: {
      '200': {
        description: 'Palabra model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Palabra, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Palabra)) filter?: Filter<Palabra>
  ): Promise<Palabra> {
    return this.palabraRepository.findById(id, filter);
  }

  @patch('/api/palabras/{id}', {
    responses: {
      '204': {
        description: 'Palabra PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Palabra, {partial: true}),
        },
      },
    })
    palabra: Palabra,
  ): Promise<void> {
    await this.palabraRepository.updateById(id, palabra);
  }

  @put('/api/palabras/{id}', {
    responses: {
      '204': {
        description: 'Palabra PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() palabra: Palabra,
  ): Promise<void> {
    await this.palabraRepository.replaceById(id, palabra);
  }

  @del('/api/palabras/{id}', {
    responses: {
      '204': {
        description: 'Palabra DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.palabraRepository.deleteById(id);
  }
}
