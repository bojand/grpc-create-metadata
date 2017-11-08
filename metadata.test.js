import test from 'ava'
const grpc = require('grpc')

const create = require('./')

test('should return metadata passed in', t => {
  const meta = new grpc.Metadata()
  meta.add('foo', 'bar')
  const ret = create(meta)
  t.is(meta, ret)
})

test('should return new metadata when simple object is passed in', t => {
  const input = { foo: 'bar' }
  const ret = create(input)
  t.true(ret instanceof grpc.Metadata)
  t.deepEqual(ret.getMap(), input)
})

test('should return new metadata when object is passed cleaning up values', t => {
  const input = {
    foo: 'bar',
    age: 12,
    prop: true,
    other: null,
    some: undefined
  }
  const ret = create(input)
  t.true(ret instanceof grpc.Metadata)
  const expected = {
    foo: 'bar',
    age: '12',
    prop: 'true'
  }
  t.deepEqual(ret.getMap(), expected)
})

test('should return new metadata and not add empty strings', t => {
  const input = {
    foo: 'bar',
    prop: ''
  }
  const ret = create(input)
  t.true(ret instanceof grpc.Metadata)
  t.deepEqual(ret.getMap(), { foo: 'bar' })
})

test('should return new metadata and add empty strings when option set', t => {
  const input = {
    foo: 'bar',
    prop: ''
  }
  const ret = create(input, { addEmpty: true })
  t.true(ret instanceof grpc.Metadata)
  t.deepEqual(ret.getMap(), input)
})

test('should get undefined on invalid object', t => {
  const input = 1
  const ret = create(input)
  t.is(ret, undefined)
})
