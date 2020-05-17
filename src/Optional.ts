import { AnySchemaType, SchemaType } from './SchemaType'
import * as t from 'io-ts'

type OptionalCodec<T extends t.Any> = t.UnionType<
  [t.NullC, t.UndefinedC, T],
  [t.TypeOf<t.NullC>, t.TypeOf<t.UndefinedC>, t.TypeOf<T>],
  [t.OutputOf<t.NullC>, t.OutputOf<t.UndefinedC>, t.OutputOf<T>],
  unknown
>

export class OptionalSchemaType<T extends AnySchemaType>
  extends SchemaType<
    T['schema'],
    OptionalCodec<T['codec']>
  > {
  constructor(schemaType: T) {
    super(
      schemaType.schema,
      t.union([t.null, t.undefined, schemaType.codec])
    )
  }
}

export const optional = <T extends AnySchemaType>(schemaType: T) => new OptionalSchemaType(schemaType)
