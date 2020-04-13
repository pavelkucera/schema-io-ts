import { Schema } from '@lib/Schema'
import * as t from 'io-ts'

export class SchemaType<S extends Schema<any>, A, O = A, I = unknown> {
  constructor(
    readonly decoder: t.Type<A, O, I>,
    readonly schema: S
  ) {
  }
}
