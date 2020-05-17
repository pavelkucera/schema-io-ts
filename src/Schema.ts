export type CommonSchema = {
  description?: string
}

// todo: BigInt support
interface NumberRange {
  minimum?: number
  exclusiveMinimum?: number
  maximum?: number
  exclusiveMaximum?: number
}

export interface NumberSchema extends CommonSchema, NumberRange {
  type: 'number'
  format?: 'double' | 'float' | string
}

export interface IntegerSchema extends CommonSchema, NumberRange {
  type: 'integer'
  format?: 'int32' | 'int64' | string
}

export type NumericSchema =
  | NumberSchema
  | IntegerSchema

export interface StringSchema extends CommonSchema {
  type: 'string'
  minLength?: number
  maxLength?: number
  format?: 'date' | 'date-time' | 'password' | 'byte' | 'binary' | string
  pattern?: string
}

export interface BooleanSchema extends CommonSchema {
  type: 'boolean'
}

export interface UnionSchema<CS extends Array<any>> extends CommonSchema {
  oneOf: Array<Schema<CS[number]>>
}

export type PropertySchemas<T extends Record<string, any>> = {
  [PropertyName in keyof T]: Schema<T[PropertyName]>
}

export interface ObjectSchema<T extends Record<string, any>, K extends keyof T> extends CommonSchema {
  type: 'object'
  properties: PropertySchemas<T>
  required: K[]
}

export type Schema<T> =
  T extends number ? NumericSchema :
  T extends string ? StringSchema :
  T extends boolean ? BooleanSchema :
  T extends Array<any> ? UnionSchema<T> :
  T extends Record<string, any> ? ObjectSchema<T, keyof T> :
    never

export type AnySchema = Schema<any>
