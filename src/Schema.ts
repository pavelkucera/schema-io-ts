export type CommonSchema = {
  description?: string
  nullable?: boolean
}

// todo: BigInt support
type NumberRange =
  & ({ minimum?: number } | { exclusiveMinimum?: number })
  & ({ maximum?: number } | { exclusiveMaximum?: number })

export type NumberSchema = CommonSchema & NumberRange & {
  type: 'number'
  format?: 'double' | 'float' | string
}

// todo: BigInt support
export type IntegerSchema = CommonSchema & NumberRange & {
  type: 'integer'
  format?: 'int32' | 'int64' | string
}

export type NumericSchema =
  | NumberSchema
  | IntegerSchema

export type StringSchema = CommonSchema & {
  type: 'string'
  minLength?: number
  maxLength?: number
  format?: 'date' | 'date-time' | 'password' | 'byte' | 'binary' | string
  pattern?: string
}

export type BooleanSchema = CommonSchema & {
  type: 'boolean'
}

export type Schema<T> =
  T extends number ? NumericSchema :
  T extends string ? StringSchema :
  T extends boolean ? BooleanSchema :
    never
