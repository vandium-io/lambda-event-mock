# `Cloud Formation`

The `cloudformation` mock is used to simulate [Cloud Formation](https://aws.amazon.com/cloudformation/)
events. To create a Cloud Formation event, use the `cloudformation()` builder:

```js
const lambdaEventMock = require( 'lambda-event-mock' );

let myMock = lambdaEventMock.cloudformation()
                    .stackId( 'arn:aws:cloudformation:us-east-2:123456789012:stack/myteststack/466df9e0-0dff-08e3-8e2f-5088487c4896' )
                    .responseURL( 'http://pre-signed-S3-url-for-response' )
                    .resourceType( 'AWS::S3::Bucket' )
                    .resourceProperty( 'StackName', 'myteststack' )
                    .logicalResourceId( 'S3Bucket' )
                    .build();

/* myMock will be:

{
  "StackId": "arn:aws:cloudformation:us-east-2:123456789012:stack/myteststack/466df9e0-0dff-08e3-8e2f-5088487c4896",
  "ResponseURL": "http://pre-signed-S3-url-for-response",
  "ResourceProperties": {
    "StackName": "myteststack"
  },
  "RequestType": "Create",
  "ResourceType": "AWS::S3::Bucket",
  "RequestId": "unique id for this create request",
  "LogicalResourceId": "S3Bucket"
}

*/
```

## `stackId( id )`


## `responseURL( url )`

## `resourceType( type )`

## `resourceProperty( name, value )`

## `resourceProperties( properties )`
