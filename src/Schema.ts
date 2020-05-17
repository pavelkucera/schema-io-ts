export type CommonSchema = {
  description?: string
}

// todo: BigInt support
// TypeScript does not do an excess property check on non-discriminated unions so
// the construct has no practical effect
// https://github.com/microsoft/TypeScript/issues/20863
type NumberRange =
  & ({ minimum?: number } | { exclusiveMinimum?: number })
  & ({ maximum?: number } | { exclusiveMaximum?: number })

export type NumberSchema =
  & CommonSchema
  & NumberRange
  & {
    type: 'number'
    format?: 'double' | 'float' | string
  }

// todo: BigInt support
export type IntegerSchema =
  & CommonSchema
  & NumberRange
  & {
    type: 'integer'
    format?: 'int32' | 'int64' | string
  }

export type NumericSchema =
  | NumberSchema
  | IntegerSchema

export type StringSchema =
  & CommonSchema
  & {
    type: 'string'
    minLength?: number
    maxLength?: number
    format?: 'date' | 'date-time' | 'password' | 'byte' | 'binary' | string
    pattern?: string
  }

export type BooleanSchema =
  & CommonSchema
  & {
    type: 'boolean'
  }

export type UnionSchema<CS extends Array<any>> =
  {
    oneOf: Array<Schema<CS[number]>>
  }

export type Schema<T> =
  T extends number ? NumericSchema :
  T extends string ? StringSchema :
  T extends boolean ? BooleanSchema :
  T extends Array<any> ? UnionSchema<T> :
    never
