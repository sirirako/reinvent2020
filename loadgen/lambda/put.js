const https = require('https')

exports.handler =  async function(event, context) {

    console.log("event: ", JSON.stringify(event, undefined, 2))
    const payload = JSON.stringify(event);
    const host = process.env.PRODUCER;

    const options = {
        hostname: host,
        port: 443,
        path: '/Prod/put',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': payload.length
        }
    }


    return new Promise((resolve, reject) => {
      const req = https.request(options,
        (res) => {
          let body = '';
          res.on('data', (chunk) => (body += chunk.toString()));
          res.on('error', reject);
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode <= 299) {
  
              resolve({statusCode: res.statusCode, headers: res.headers, body: body});
            } else {
              reject('Request failed. StatusCode: ' + res.statusCode + ', body: ' + body);
            }
          });
        });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });
}
