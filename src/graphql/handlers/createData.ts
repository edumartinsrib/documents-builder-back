import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ApolloServer, gql } from 'apollo-server-lambda'
import { connect, connection } from 'mongoose'

import { DataModel } from '../models/Data'

const typeDefs = gql`
  type Mutation {
    createData(input: DataInput!): Data
  }

  type Data {
    id: ID!
    field1: String!
    field2: Int!
  }

  input DataInput {
    field1: String!
    field2: Int!
  }
`

const resolvers = {
  Mutation: {
    createData: async (_: any, { input }: any) => {
      try {
        await connect(process.env.MONGO_URI || '', {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })

        const data = new DataModel(input)
        await data.save()

        return data
      } catch (error) {
        console.log(error)
        throw new Error('Error creating data')
      } finally {
        connection.close()
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
