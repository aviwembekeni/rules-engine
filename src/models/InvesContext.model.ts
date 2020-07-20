import { APIGatewayEvent, Context } from 'aws-lambda';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import winston from 'winston';

export interface Cached {
  db: DynamoDB.DocumentClient;
}

export default interface InvesContext {
  readonly requestId: number;
  readonly event: APIGatewayEvent;
  readonly lambdaContext: Context;
  readonly db: DynamoDB.DocumentClient;
  readonly logger: winston.Logger;
}
