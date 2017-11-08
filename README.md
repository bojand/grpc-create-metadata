<a name="module_grpc-create-metadata"></a>

### grpc-create-metadata
Simple Node.js helper utility for creating gRPC metadata

**Example** *(Installation)*  

```js
npm install grpc-create-metadata
```

**Example** *(Usage)*  

```js
const grpc = require('grpc')
const create = require('grpc-create-metadata')
const meta = create({
  name: 'Bob',
  age: 20,
  active: true
});
console.log(meta instanceof grpc.Metadata) // true
console.dir(meta.getMap()) // { foo: 'bar', age: '12', prop: 'true' }
```

<a name="exp_module_grpc-create-metadata--module.exports"></a>

#### module.exports(metadata, options) ⇒ <code>Metadata</code> ⏏
Utility helper function to create <code>Metadata</code> object from plain Javascript object
This strictly just calls <code>Metadata.add</code> with the key / value map of objects.
If the value is a <code>Buffer</code> it's passed as is.
If the value is a <code>Sting</code> it's passed as is.
Else if the value defined and not a string we simply call <code>toString()</code>.
Note that <code>Metadata</code> only accept string or buffer values.

**Kind**: Exported function  
**Returns**: <code>Metadata</code> - An instance of <code>Metadata</code>, or `undefined` if input is not an object  

| Param | Type | Description |
| --- | --- | --- |
| metadata | <code>Object</code> | Plain javascript object to tranform into <code>Metadata</code>                           If an instance of <code>Metadata</code> is passed in it is simply returned |
| options | <code>Object</code> | options |
| options.addEmpty | <code>Boolean</code> | whether to add empty strings. Default: <code>false</code> |

