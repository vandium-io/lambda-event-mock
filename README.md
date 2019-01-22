[![Build Status](https://travis-ci.org/vandium-io/lambda-event.mock.svg?branch=master)](https://travis-ci.org/vandium-io/lambda-event-mock)
[![npm version](https://badge.fury.io/js/lambda-event-mock.svg)](https://badge.fury.io/js/lambda-event-mock)

# lambda-event-mock

Mocking library for testing AWS Lambda events by creating realistic events that
contain dynamic data.

## Features
* Easy to use builder-pattern to create mock lambda events for testing
* Works with [lambda-tester](https://github.com/vandium-io/lambda-tester)
* Works with Node 8.x

## Installation
Install via npm.

	npm install lambda-event-mock --save-dev


## Getting Started

The following example code creates an `s3` lambda event for the object
`picture1.gif` in the `my-bucket-uploaded-pictures` bucket.

```js
const lambdaEventMock = require( 'lambda-event-mock' );

let myMock = lambdaEventMock.s3()
				.object( 'picture1.gif' )
				.bucket( 'my-bucket-uploaded-pictures' )
				.build();

// myMock contains an s3 event object:
/*
{
  "Records": [
    {
      "eventVersion": "2.0",
      "eventTime": "2018-11-15T20:46:39.446Z",
      "requestParameters": {
        "sourceIPAddress": "127.0.0.1"
      },
      "s3": {
        "configurationId": "testConfigRule",
        "object": {
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901",
          "key": "picture1.gif",
          "size": 1024
        },
        "bucket": {
          "arn": "bucketarn",
          "name": "my-bucket-uploaded-pictures",
          "ownerIdentity": {
            "principalId": "USER"
          }
        },
        "s3SchemaVersion": "1.0"
      },
      "responseElements": {
        "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH",
        "x-amz-request-id": "EXAMPLE123456789"
      },
      "awsRegion": "us-east-1",
      "eventName": "ObjectCreated:Put",
      "userIdentity": {
        "principalId": "USER"
      },
      "eventSource": "aws:s3"
    }
  ]
}
*/
```

Note that `lambda-event-mock` fills in the time, date, and other properties of
the event to create a realistic looking event.

## Documentation

For documentation on how to use this module in your project, please see our
[documentation](docs) page.

## Feedback

We'd love to get feedback on how you're using lambda-event-mock and things we
could add to make this tool better. Feel free to contact us at
`feedback@vandium.io`


## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
