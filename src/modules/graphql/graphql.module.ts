import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { GraphQLErrorResponse } from './interfaces';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/modules/graphql/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      formatError: (error: GraphQLError) => {
        const originalError = error.extensions
          .originalError as GraphQLErrorResponse;

        return {
          error: true,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          message: error.message,
          statusCode: originalError?.statusCode || 500,
        };
      },
    }),
  ],
})
export class GraphQlModule {}
