import { LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { Tracing } from '@aws-cdk/aws-lambda';
import lambda = require('@aws-cdk/aws-lambda');
import * as cdk from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';
import path = require('path');

export class LoadgenStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const put = new lambda.Function(this, 'PutRequest', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'put.handler',
      code: lambda.Code.fromAsset('lambda'),
      tracing: Tracing.DISABLED,
      timeout: Duration.seconds(5),
      environment: { 
        PRODUCER: "onysq05xu9.execute-api.us-east-1.amazonaws.com"
      },
      functionName: 'PutRequest'
    });

    const loadgenerator = new lambda.Function(this, 'LoadGen', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'load.handler',
      code: lambda.Code.fromAsset(path.join(__dirname,'../','load')),
      tracing: Tracing.DISABLED,
      environment: {
        DOWNSTREAM_FUNCTION_NAME: put.functionName
      },
      functionName: 'LoadGen',
      timeout: Duration.minutes(15)

    });

    put.grantInvoke(loadgenerator);

  }
}
