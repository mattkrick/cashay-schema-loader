import 'babel-polyfill';
import path from 'path';
import { graphql } from 'graphql';
import introspectionQuery from './introspectionQuery';
import makeMinimalSchema from './makeMinimalSchema';

export default async function(source) {
  this.cacheable();
  
  const callback = this.async();
  const schema = this.exec(source, this.resourcePath);
  const initialResult = await graphql(schema, introspectionQuery);
  const minimalSchema = makeMinimalSchema(initialResult.data.__schema);
  const result = `module.exports = ${JSON.stringify(minimalSchema)};`;

  callback(null, result)
};
