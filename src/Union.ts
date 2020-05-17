import { AnySchemaType, MixedSchemaType, SchemaType } from './SchemaType'
import { CommonSchema, UnionSchema } from './OpenApi/Schema'
import * as t from 'io-ts'

export class UnionSchemaType<
    CS extends [AnySchemaType, AnySchemaType, ...Array<AnySchemaType>]
  > extends SchemaType<
    UnionSchema<any>,
    t.UnionC<t.TypeOf<CS[number]['codec']>>
  > {
  constructor(
    schemaTypes: CS,
    schema?: CommonSchema
  ) {
    super(
      {
        oneOf: schemaTypes.map(schemaType => schemaType.schema),
        ...schema,
      },
      t.union(
        schemaTypes.map(schemaType => schemaType.codec) as [t.Mixed, t.Mixed, ...Array<t.Mixed>]
      ),
    );
  }
}

export const union = <CS extends [MixedSchemaType, MixedSchemaType, ...Array<MixedSchemaType>]>(
  schemaTypes: CS
): UnionSchemaType<CS> =>
  new UnionSchemaType(schemaTypes)
