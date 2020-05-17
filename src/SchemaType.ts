import { Schema } from './OpenApi/Schema'
import * as t from 'io-ts'

export class SchemaType<S extends Schema<any>, C extends t.Any> {
  constructor(
    readonly schema: S,
    readonly codec: C
  ) {
  }
}

export type MixedSchemaType = SchemaType<Schema<any>, t.Mixed>

export type AnySchemaType = SchemaType<Schema<any>, t.Any>

export type TypeOf<T extends AnySchemaType> = t.TypeOf<T['codec']>
