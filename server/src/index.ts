import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { env } from './env'
import { buildContext } from './graphql/context'
import { AuthResolver } from './resolvers/auth.resolver'
import { CommentResolver } from './resolvers/comment.resolver'
import { IdeaResolver } from './resolvers/idea.resolver'
import { UserResolver } from './resolvers/user.resolver'
import { VoteResolver } from './resolvers/vote.resolver'

async function bootstrap() {
  const app = express()

  const allowedOrigins = env.CORS_ORIGINS.split(',')

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
    })
  )

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      IdeaResolver,
      CommentResolver,
      VoteResolver,
    ],
    validate: false,
    emitSchemaFile: './schema.graphql',
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    })
  )

  app.listen(
    {
      port: env.PORT,
    },
    () => {
      console.log('\n🚀 MindShare Server is ready!\n')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log(`📡 GraphQL API:  http://localhost:${env.PORT}/graphql`)
      console.log(`🌐 CORS enabled: ${allowedOrigins.join(', ')}`)
      console.log(`🔧 Environment:  ${env.NODE_ENV}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    }
  )
}

bootstrap()
