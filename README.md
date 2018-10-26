[![Build Status](https://travis-ci.org/vandium-io/lambda-event.mock.svg?branch=master)](https://travis-ci.org/vandium-io/lambda-event-mock)
[![npm version](https://badge.fury.io/js/lambda-event-mock.svg)](https://badge.fury.io/js/lambda-event-mock)

# lambda-event-mock

Mocking library for AWS Lambda events

## Features
* Works with Node 8.x

## Installation
Install via npm.

	npm install lambda-event-mock --save-dev


## Getting Started

```js
const lambdaEventMock = require( 'lambda-event-mock' );

let myMock = lambdaEventMock.s3()
						.object( 'picture1.gif' )
						.bucket( 'my-bucket-uploaded-pictures' )
						.build();

// myMock contains an s3 event object
```


## Feedback

We'd love to get feedback on how you're using lambda-event-mock and things we
could add to make this tool better. Feel free to contact us at
`feedback@vandium.io`


## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
