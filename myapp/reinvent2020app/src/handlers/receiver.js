const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
AWSXRay.captureHTTPsGlobal(require('https'));
const axios = require('axios');
const api = "https://qumgfzl479.execute-api.us-east-1.amazonaws.com/Prod/v2/";
const lambda = new AWS.Lambda();
const ddb = new AWS.DynamoDB();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function categorize(v2) {
    var level = "";
  
    if (v2 > 100) {
      level = "Too Fast"
    } else if (v2 < 100 & v2 > 50 ) {
      level = "Legal"
    } else if (v2 < 51 & v2 > 0 ) {
      level = "Too slow";  
    } else {
      level = "Bad Data"; //throw new Error('Bad Data');
    }; 
      return level;
  }

  const getV2 = async (url) => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
};  

exports.Handler = async (event, context) => {
    // If you change this message, you will need to change hello-from-lambda.test.js
    const message = 'Hello from Lambda!';
    // All log statements are written to CloudWatch
    console.info(`${message}`);
    console.log("request:", JSON.stringify(event, undefined, 2));

    const method = event.httpMethod;
    const data = JSON.parse(event.body);
    console.log('Model :'+ data.model);
    var response = {
        'statusCode': 200,
        'body': JSON.stringify({
            'message': 'hello world'
        })
    }
    const segment = AWSXRay.getSegment();

    if (method == "POST") {
        try {
            console.log("POST");
            //const segment = AWSXRay.getSegment();
            const subsegment = segment.addNewSubsegment('calling-CalService');
            subsegment.addAnnotation('model', data.model);
            subsegment.addAnnotation('version',data.version);
            subsegment.addAnnotation('UserID', data.deviceid);
            subsegment.addMetadata('DeviceId', data.deviceid);
            subsegment.addMetadata('accelerator',data.a);
            subsegment.addMetadata('velocity',data.v1);
            subsegment.addMetadata('time',data.time);
            subsegment.addMetadata('velocity',data.v1);
            if (data.version == "v10") {
              let processtime = Math.floor(Math.random()*1001)
              subsegment.addMetadata('processtime',processtime);
              await sleep(processtime);
              
            } else {
              let processtime = Math.floor(Math.random()*1001+1000)
              subsegment.addMetadata('processtime',processtime);
              await sleep(processtime);
            }
            if (data.model == "unknown") {
              let processtime = Math.floor(Math.random()*1001+3000)
              subsegment.addMetadata('processtime',processtime);
              await sleep(processtime);
            }

            const url = api + data.v1 + "/" + data.a + "/" + data.time
            console.log(url);
            const apiresponse = await getV2(url);

            subsegment.close();
            
            console.log("Test :", apiresponse.data.result);

            var response = {
                statusCode : 200,
                body: JSON.stringify({ 'result' : apiresponse.data.result }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }

        } 
        catch (err) {
            console.log(err.tostring());
            response = {
                'statusCode': 500,
                'body': JSON.stringify({
                    'message': err.tostring()
                })
            }

        }
        finally {
            return response;
        }
    
    
    }
}
