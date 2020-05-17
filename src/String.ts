import { SchemaType } from './SchemaType'
import { CommonSchema, StringSchema } from './OpenApi/Schema'
import * as t from 'io-ts'

export class StringSchemaType extends SchemaType<StringSchema, t.StringC> {
  constructor(schema?: CommonSchema) {
    super(
      {
        type: 'string',
        ...schema
      },
      t.string
    )
  }
}

export const string = (schema?: CommonSchema) =>
  new StringSchemaType(schema)
