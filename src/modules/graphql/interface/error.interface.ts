export interface GraphQLErrorResponse {
  error: boolean;
  code: string;
  message: string;
  statusCode: number;
  path?: string[];
  details?: any;
}
