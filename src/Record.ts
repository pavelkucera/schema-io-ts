import { MixedSchemaType, SchemaType } from '@lib/SchemaType'
import { MixedSchema, ObjectSchema, PropertySchemas } from './Schema'
import * as t from 'io-ts'
import { fold } from 'fp-ts/lib/Either'

type PropertyTypes <T extends Record<string, MixedSchemaType>> = {
  [PropertyName in keyof T]: t.TypeOf<T[PropertyName]['codec']>
}

type PropertyCodecs<T extends Record<string, MixedSchemaType>> = {
  [PropertyName in keyof T]: T[PropertyName]['codec']
}

export class RecordSchemaType<T extends Record<string, MixedSchemaType>>
  extends SchemaType<
    ObjectSchema<PropertyTypes<T>, keyof T>,
    t.TypeC<PropertyCodecs<T>>
  > {
  constructor(
    schema: ObjectSchema<PropertyTypes<T>, keyof T>,
    codec: t.TypeC<PropertyCodecs<T>>
  ) {
    super(schema, codec)
  }
}

export const record = <T extends Record<string, MixedSchemaType>>(props: T): RecordSchemaType<T> => {
  // todo: strict type checking
  const propertySchemas: Record<string, MixedSchema> = {}
  const codecProperties: Record<string, t.Mixed> = {}
  const required = []

  const keys = Object.keys(props);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];

    propertySchemas[key] = props[key].schema
    codecProperties[key] = props[key].codec

    const isNullable = fold(
      () => false,
      () => true
    )(props[key].codec.decode(null))

    if (!isNullable) {
      required.push(key);
    }
  }

  return new RecordSchemaType<T>(
    {
      type: 'object',
      properties: propertySchemas as PropertySchemas<PropertyTypes<T>>,
      required: required
    },
    t.type(codecProperties as PropertyCodecs<T>)
  )
}
