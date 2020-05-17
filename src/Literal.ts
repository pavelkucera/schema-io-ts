import { SchemaType } from './SchemaType'
import { StringSchema } from './OpenApi/Schema'
import * as t from 'io-ts'

export class LiteralSchemaType<T extends string> extends SchemaType<StringSchema, t.LiteralC<T>> {
  constructor(value: T) {
    super(
      {
        type: 'string',
      },
      t.literal(value),
    );
  }
}

export const literal = <T extends string>(value: T): LiteralSchemaType<T> =>
  new LiteralSchemaType(value)
