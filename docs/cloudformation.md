# `CloudFormation`

The `cloudformation` mock is used to simulate [CloudFormation](https://aws.amazon.com/cloudformation/)
events. To create a CloudFormation event, use the `cloudformation()` builder:

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

Sets the `StackId` property

## `responseURL( url )`

Sets the `ResponseURL` property

## `resourceType( type )`

Sets the `ResourceType` property

## `resourceProperty( name, value )`

Adds a single resource property to the `ResourceProperties` object

## `resourceProperties( properties )`

Sets one or more values of the `ResourceProperties` object
