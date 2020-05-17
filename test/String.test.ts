import { string, StringSchemaType } from '@lib/String'

describe('String', () => {
  it('creates an instance of StringSchemaType', () => {
    const schemaType = string({})
    expect(schemaType).toBeInstanceOf(StringSchemaType)
  })
})
