import 'babel-polyfill';
import path from 'path';
import introspectionQuery from './introspectionQuery';
import makeMinimalSchema from './makeMinimalSchema';

const graphql = require(path.join(process.cwd(), 'node_modules', 'graphql')).graphql;

export default async function(source) {
  this.cacheable();

  const callback = this.async();
  const schema = this.exec(source, this.resourcePath);
  const initialResult = await graphql(schema, introspectionQuery);
  const minimalSchema = makeMinimalSchema(initialResult.data.__schema);
  const result = `module.exports = ${JSON.stringify(minimalSchema)};`;

  callback(null, result)
};
