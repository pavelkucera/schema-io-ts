import { SchemaType } from '@lib/SchemaType'
import { CommonSchema, StringSchema } from '@lib/Schema'
import * as t from 'io-ts'

export class StringSchemaType extends SchemaType<StringSchema, string> {
  constructor(schema: CommonSchema) {
    super(
      t.string,
      {
        type: 'string',
        ...schema
      },
    )
  }
}

export const string = (schema: CommonSchema) =>
  new StringSchemaType(schema)
