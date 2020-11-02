#!/bin/bash
counter=1
while [ $counter -le 10 ]
do 
aws lambda invoke --function-name LoadGen --invocation-type RequestResponse --payload '{ "load": "5" }' response.json --cli-binary-format raw-in-base64-out
((counter++))
done