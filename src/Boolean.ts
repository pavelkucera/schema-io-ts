import { SchemaType } from './SchemaType'
import { BooleanSchema, CommonSchema } from './OpenApi/Schema'
import * as t from 'io-ts'

export class BooleanSchemaType extends SchemaType<BooleanSchema, t.BooleanC> {
  constructor(schema?: CommonSchema) {
    super(
      {
        type: 'boolean',
        ...schema
      },
      t.boolean
    )
  }
}

export const boolean = (schema?: CommonSchema) =>
  new BooleanSchemaType(schema)
