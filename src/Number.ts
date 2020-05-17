import { SchemaType } from '@lib/SchemaType'
import { CommonSchema, NumberSchema } from '@lib/Schema'
import * as t from 'io-ts'

export class NumberSchemaType extends SchemaType<NumberSchema, t.NumberC> {
  constructor(schema?: CommonSchema) {
    super(
      {
        type: 'number',
        ...schema
      },
      t.number
    )
  }
}

export const number = (schema?: CommonSchema) =>
  new NumberSchemaType(schema)
