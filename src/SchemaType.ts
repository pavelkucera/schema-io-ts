import { Schema } from '@lib/Schema'
import * as t from 'io-ts'

export class SchemaType<S extends Schema<any>, A, O = A, I = unknown> {
  constructor(
    readonly codec: t.Type<A, O, I>,
    readonly schema: S
  ) {
  }
}

export type MixedSchemaType = SchemaType<Schema<any>, any, any>

export type AnySchemaType = SchemaType<Schema<any>, any, any, any>
