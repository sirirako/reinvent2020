const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

function v2(x, y, z) {
    return (x + y*z);
}
exports.Handler = async (event, context) => {
    // If you change this message, you will need to change hello-from-lambda.test.js
    const message = 'Hello from Lambda!';

    // All log statements are written to CloudWatch
    console.info(`${message}`);
    console.log("request:", JSON.stringify(event, undefined, 2));
    
    var v = event["pathParameters"]["x"], u = event["pathParameters"]["y"], t = event["pathParameters"]["z"];
    console.log("yes : ", v);
    var result = v2(Number(v), Number(u), Number(t));
    


    var response = {
        statusCode : 200,
        body: JSON.stringify({ 'result' : result }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    }
    return response

}
