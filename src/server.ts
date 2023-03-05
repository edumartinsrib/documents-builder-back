import express, { Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true ,
  useUnifiedTopology: true
})

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => 'Hello, world!'
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
)

export default app
