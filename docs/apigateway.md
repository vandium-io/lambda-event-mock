# `api` Event Mock

The `api` mock is used to simulate [AWS API Gateway](https://aws.amazon.com/api-gateway) events using the Lambda Proxy based method. To create an API Gateway mock event, use the `apigateway()` builder:

```js
const lambdaEventMock = require( '.' );

let myMock = lambdaEventMock.apigateway()
                    .path( '/things' )
                    .method( 'POST' )
                    .header( 'day', 'Friday' )
                    .body( { one: 1, two: 2 } )
                    .build();

/* myMock will be:

{
  "resource": "/things",
  "path": "/things",
  "httpMethod": "POST",
  "headers": {
    "day": "Friday"
  },
  "queryStringParameters": null,
  "pathParameters": null,
  "stageVariables": null,
  "requestContext": {
    "resourcePath": "/",
    "apiId": "00aaa0a00a"
  },
  "body": "{\"one\":1,\"two\":2}",
  "isBase64Encoded": false
}

*/
```

## `path( p )`

Sets the event's `path` and `resource` properties.

## `method( m )`

Sets the event's `httpMethod` property.

## `body( value )`

Sets the event's `body` and `isBase64Encoded` properties. `body()` will encode
`Buffer` instances as `base64` encoded strings and set the `isBase64Encoded`
property to true. `Object` instances are converted to strings using `JSON.stringify()`.
All other types are converted, if required, and stored as strings.

## `apiId( id )`

Sets the event's `requestContext.apiId` property

## `header( name, value )`

Sets an individual value in the event's `headers` property

## `headers( values )`

Sets one or more header values in the event's `headers` property. The following
sample code demonstrates how to set one or more headers:

```js
const lambdaEventMock = require( '.' );

let myMock = lambdaEventMock.apigateway()
                    .headers( {

                        day: 'Friday',
                        happy: 'Yes'
                    })
                    .header( 'age', '42' )
                    .build();

/*

myMock.headers will equal:
{
  "day": "Friday",
  "happy", "Yes",
  "age", "42"
}

*/
```

## `queryStringParameter( name, value )`

Sets an individual value in the event's `queryStringParameters` property.

## `queryStringParameters( values )`

Sets one or more query string parameter values in the event's
`queryStringParameters` property. The following
sample code demonstrates how to set one or more query string parameter values:

```js
const lambdaEventMock = require( '.' );

let myMock = lambdaEventMock.apigateway()
                    .queryStringParameters( {

                        expanded: 'true',
                        page: '1'
                    })
                    .queryStringParameter( 'show', '45' )
                    .build();

/*

myMock.headers will equal:
{
  "expanded": "true",
  "page", "1",
  "show", "45"
}

*/
```
