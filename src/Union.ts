import { AnySchemaType, MixedSchemaType, SchemaType } from '@lib/SchemaType'
import { UnionSchema } from '@lib/Schema'
import * as t from 'io-ts'

export class UnionSchemaType<
    CS extends [AnySchemaType, AnySchemaType, ...Array<AnySchemaType>]
  > extends SchemaType<
    UnionSchema<any>,
    t.UnionC<t.TypeOf<CS[number]['codec']>>
  > {
  constructor(
    schemaTypes: CS
  ) {
    super(
      {
        oneOf: schemaTypes.map(schemaType => schemaType.schema),
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
