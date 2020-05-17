import { AnySchemaType, SchemaType, TypeOf } from './SchemaType'
import { ArraySchema, Schema } from './OpenApi/Schema'
import * as t from 'io-ts'

export class ListSchemaType<T extends AnySchemaType> extends SchemaType<ArraySchema<TypeOf<T>>, t.ArrayC<T['codec']>>{
  constructor(
    itemSchemaType: T
  ) {
    super(
      {
        type: 'array',
        // todo: no type casting
        items: itemSchemaType.schema as Schema<TypeOf<T>>
      },
      t.array(itemSchemaType.codec)
    )
  }
}

export const list = <T extends AnySchemaType>(item: T): ListSchemaType<T> =>
  new ListSchemaType<T>(item)
