const grpc = require('grpc')
const forOwn = require('lodash.forown')

/**
 * Simple Node.js helper utility for creating gRPC metadata
 *
 * @example <caption>Installation</caption>
 * npm install grpc-create-metadata
 *
 * @example <caption>Usage</caption>
 * const grpc = require('grpc')
 * const create = require('grpc-create-metadata')
 * const meta = create({
 *   name: 'Bob',
 *   age: 20,
 *   active: true
 * });
 * console.log(meta instanceof grpc.Metadata) // true
 * console.dir(meta.getMap()) // { foo: 'bar', age: '12', prop: 'true' }
 * @module grpc-create-metadata
 */

/**
 * Utility helper function to create <code>Metadata</code> object from plain Javascript object
 * This strictly just calls <code>Metadata.add</code> with the key / value map of objects.
 * If the value is a <code>Buffer</code> it's passed as is.
 * If the value is a <code>Sting</code> it's passed as is.
 * Else if the value defined and not a string we simply call <code>toString()</code>.
 * Note that <code>Metadata</code> only accept string or buffer values.
 * @param  {Object} metadata Plain javascript object to tranform into <code>Metadata</code>
 *                           If an instance of <code>Metadata</code> is passed in it is simply returned
 * @param  {Object} options options
 * @param  {Boolean} options.addEmpty whether to add empty strings. Default: <code>false</code>
 * @return {Metadata} An instance of <code>Metadata</code>, or `undefined` if input is not an object
 */
module.exports = function create (metadata, options) {
  if (!isObject(metadata)) {
    return
  }

  if (metadata instanceof grpc.Metadata) {
    return metadata
  }

  const meta = new grpc.Metadata()
  forOwn(metadata, (v, k) => {
    if (Buffer.isBuffer(v)) {
      meta.add(k, v)
    } else if (v !== null && !isUndefined(v)) {
      const toAdd = isString(v) ? v : v.toString()
      if (toAdd || (options && options.addEmpty)) {
        meta.add(k, toAdd)
      }
    }
  })

  return meta
}

function isObject (value) {
  const type = typeof value
  return value !== null && type === 'object'
}

function isString (value) {
  const type = typeof value
  return type === 'string'
}

function isUndefined (value) {
  const type = typeof value
  return value !== null && type === 'undefined'
}
