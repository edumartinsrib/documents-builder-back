import { APIGatewayProxyHandler } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import 'dotenv/config';

import { handler as createDataHandler } from './handlers/createData';
import { connect } from 'mongoose';

const server = new ApolloServer({
  typeDefs: '',
  resolvers: {},
});

export const createData: APIGatewayProxyHandler = async (event) => {
  const { httpMethod, body } = event;

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: '',
   
