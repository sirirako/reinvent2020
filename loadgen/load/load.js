const { Lambda } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
lambda = new Lambda();

exports.handler = async (event, context) => {

    console.log("request:", JSON.stringify(event, undefined, 2));
    const amount = Number(event.load);
    console.log(amount);
    var response;

    try {
        var i  = 0;
        var allresults = [];
        while (i <= amount)
        {

            var d = new Date();
            var n = d.toISOString();
            var c = n.substr(0, 10);
            var pop = 100;
            var model = "unknown"; 
            var myid = Math.floor(Math.random()*pop);
            if (myid < pop*0.2) {
                model = "A"
            } else if (myid > pop*0.2 & myid < pop*0.3) {
                model = "B"
            } else if (myid > pop*0.3 & myid < pop*0.6) {
                model = "C"
            } else if (myid > pop*0.6 & myid < pop) {
                model = "D"
            }
            var deviceid = "id-" + myid.toString();
            var version = "";
            if (myid%2 == 0) {
                version = "v10"  //change to v9 first then v10
            } else if (myid%3 ==0 ) {
                version = "v9"
            } else if (myid%5 ==0 ) {
                version = "v8"
            } else {
                version = "v7"
            }
            var a = Math.floor(Math.random()*100);
            if (model == "A" & version == "v10") {
                a = a*(-1);
            };

            load = {
                'id': uuidv4(),
                'deviceid': deviceid,
                'version': version,
                'model': model,
                'v1': (Math.floor(Math.random()*10)).toString(),
                'a': a.toString(),
                'time': (Math.floor(Math.random()*10)).toString(),
                'created': n,
                'createddate': c,
                'TTL': '0'
            }
            var payload = { load }
            console.log(JSON.stringify(payload));
            
            //var l = await 
            await lambda.invoke({
                FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
                Payload: JSON.stringify(payload.load),
                InvocationType: "Event"
            }).promise();
            //allresults.push(l); 

            if (i%25 == 0)  {
                console.log(`load sent: ${i.toString()}`)
            }

            i++
        }
            response = {
                'statusCode': 200,
                'body': JSON.stringify({
                    'message': 'hello world',
                    'Sent': i.toString()
                    // location: ret.data.trim()
                })
            }
            //console.log(`StatusCode: ${ret.status}`)

    }
    catch (err) {
        console.log(err);
        response = err;
    } finally {

    return response
    }
}

