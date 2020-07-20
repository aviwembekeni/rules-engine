import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export default interface ContextOptions {
  event: APIGatewayProxyEvent;
  context: Context;
}
