import { record } from '../src'
import { string } from '../src'
import { number } from '../src'
import { union } from '../src'
import { fold } from 'fp-ts/lib/Either'
import { AnySchemaType } from '../src'

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
