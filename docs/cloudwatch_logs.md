# `CloudWatch`

The `cloudwatch` mock is used to simulate [CloudWatch](https://aws.amazon.com/cloudwatch/)
events. To create a CloudWatch event, use the `cloudwatch()` builder:

```js
const lambdaEventMock = require( 'lambda-event-mock' );

let myMock = lambdaEventMock.cloudfront()
                    .distributionDomainName( 'd123.cloudfront.net' )
                    .distributionId( 'EDFDVBD6EXAMPLE' )
                    .eventType( 'viewer-request' )
                    .requestId( 'MRVMF7KydIvxMWfJIglgwHQwZsbG2IhRJ07sn9AkKUFSHS9EXAMPLE==' )
                    .body( {
                        action: 'read-only',
                        data: 'eyJ1c2VybmFtZSI6IkxhbWJkYUBFZGdlIiwiY29tbWVudCI6IlRoaXMgaXMgcmVxdWVzdCBib2R5In0=',
                        encoding: 'base64',
                        inputTruncated: false
                    })
                    .clientIp( '2001:0db8:85a3:0:0:8a2e:0370:7334' )
                    .querystring( 'size=large' )
                    .uri( '/picture.jpg' )
                    .method( 'GET' )
                    .header( 'host', 'Host', 'd111111abcdef8.cloudfront.net' )
                    .header( 'user-agent', 'User-Agent', 'curl/7.51.0' )
                    .build();

/* myMock will be:

{
  "Records": [
    {
      "cf": {
        "config": {
          "distributionId": "EDFDVBD6EXAMPLE",
          "distributionDomainName": "d123.cloudfront.net",
          "eventType": "viewer-request",
          "requestId": "MRVMF7KydIvxMWfJIglgwHQwZsbG2IhRJ07sn9AkKUFSHS9EXAMPLE=="
        },
        "request": {
          "clientIp": "2001:0db8:85a3:0:0:8a2e:0370:7334",
          "method": "GET",
          "uri": "/picture.jpg",
          "headers": {
            "host": [
              {
                "key": "Host",
                "value": "d111111abcdef8.cloudfront.net"
              }
            ],
            "user-agent": [
              {
                "key": "User-Agent",
                "value": "curl/7.51.0"
              }
            ]
          },
          "body": {
            "action": "read-only",
            "data": "eyJ1c2VybmFtZSI6IkxhbWJkYUBFZGdlIiwiY29tbWVudCI6IlRoaXMgaXMgcmVxdWVzdCBib2R5In0=",
            "encoding": "base64",
            "inputTruncated": false
          },
          "querystring": "size=large"
        }
      }
    }
  ]
}

*/
```
