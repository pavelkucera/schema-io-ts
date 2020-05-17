import { record } from '@lib/Record'
import { string } from '@lib/String'
import { number } from '@lib/Number'
import { union } from '@lib/Union'
import { fold } from 'fp-ts/lib/Either'
import { AnySchemaType } from '@lib/SchemaType'

describe('Validation', () => {
  const isValid = (type: AnySchemaType, value: unknown) => fold(
    () => false,
    () => true,
  )(type.codec.decode(value))

  it('Accepts valid values', () => {
    const FooBar = record({
      foo: string(),
      bar: number(),
      foobar: union([string(), number()]),
      child: record({
        some: string(),
      }),
    })

    expect(isValid(FooBar, {
      foo: 'foo',
      bar: 42,
      foobar: 42,
      child: {
        some: 'value',
      },
    })).toBe(true)
  })
});
