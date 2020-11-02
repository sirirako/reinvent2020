"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadgenStack = void 0;
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const lambda = require("@aws-cdk/aws-lambda");
const cdk = require("@aws-cdk/core");
const core_1 = require("@aws-cdk/core");
const path = require("path");
class LoadgenStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        const put = new lambda.Function(this, 'PutRequest', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'put.handler',
            code: lambda.Code.fromAsset('lambda'),
            tracing: aws_lambda_1.Tracing.DISABLED,
            timeout: core_1.Duration.seconds(5),
            environment: {
                PRODUCER: "onysq05xu9.execute-api.us-east-1.amazonaws.com"
            },
            functionName: 'PutRequest'
        });
        const loadgenerator = new lambda.Function(this, 'LoadGen', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'load.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, '../', 'load')),
            tracing: aws_lambda_1.Tracing.DISABLED,
            environment: {
                DOWNSTREAM_FUNCTION_NAME: put.functionName
            },
            functionName: 'LoadGen',
            timeout: core_1.Duration.minutes(15)
        });
        put.grantInvoke(loadgenerator);
    }
}
exports.LoadgenStack = LoadgenStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGdlbi1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWRnZW4tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esb0RBQThDO0FBQzlDLDhDQUErQztBQUMvQyxxQ0FBcUM7QUFDckMsd0NBQXlDO0FBQ3pDLDZCQUE4QjtBQUU5QixNQUFhLFlBQWEsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN6QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUU3QyxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNsRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLG9CQUFPLENBQUMsUUFBUTtZQUN6QixPQUFPLEVBQUUsZUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUIsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxnREFBZ0Q7YUFDM0Q7WUFDRCxZQUFZLEVBQUUsWUFBWTtTQUMzQixDQUFDLENBQUM7UUFFSCxNQUFNLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUN6RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQsT0FBTyxFQUFFLG9CQUFPLENBQUMsUUFBUTtZQUN6QixXQUFXLEVBQUU7Z0JBQ1gsd0JBQXdCLEVBQUUsR0FBRyxDQUFDLFlBQVk7YUFDM0M7WUFDRCxZQUFZLEVBQUUsU0FBUztZQUN2QixPQUFPLEVBQUUsZUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FFOUIsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVqQyxDQUFDO0NBQ0Y7QUFsQ0Qsb0NBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGFtYmRhSW50ZWdyYXRpb24gfSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBUcmFjaW5nIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgbGFtYmRhID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWxhbWJkYScpO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgRHVyYXRpb24gfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5leHBvcnQgY2xhc3MgTG9hZGdlblN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuXG4gICAgY29uc3QgcHV0ID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnUHV0UmVxdWVzdCcsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgaGFuZGxlcjogJ3B1dC5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICB0cmFjaW5nOiBUcmFjaW5nLkRJU0FCTEVELFxuICAgICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcyg1KSxcbiAgICAgIGVudmlyb25tZW50OiB7IFxuICAgICAgICBQUk9EVUNFUjogXCJvbnlzcTA1eHU5LmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXCJcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbk5hbWU6ICdQdXRSZXF1ZXN0J1xuICAgIH0pO1xuXG4gICAgY29uc3QgbG9hZGdlbmVyYXRvciA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0xvYWRHZW4nLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGhhbmRsZXI6ICdsb2FkLmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsJy4uLycsJ2xvYWQnKSksXG4gICAgICB0cmFjaW5nOiBUcmFjaW5nLkRJU0FCTEVELFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiBwdXQuZnVuY3Rpb25OYW1lXG4gICAgICB9LFxuICAgICAgZnVuY3Rpb25OYW1lOiAnTG9hZEdlbicsXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5taW51dGVzKDE1KVxuXG4gICAgfSk7XG5cbiAgICBwdXQuZ3JhbnRJbnZva2UobG9hZGdlbmVyYXRvcik7XG5cbiAgfVxufVxuIl19