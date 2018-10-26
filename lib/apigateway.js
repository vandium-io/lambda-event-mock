'use strict';

const SimpleEventMock = require( './simple' );

const utils = require( './utils' );

class APIGatewayEventMock extends SimpleEventMock {

    constructor() {

        super( 'apigateway' );
    }

    body( body = {}, base64Encoded = false ) {

        if( body ) {

            if( body instanceof Buffer ) {

                body = body.toString( 'base64' );
                base64Encoded = true;
            }
            else {

                if( utils.isObject( body ) ) {

                    body = JSON.stringify( body );
                }
                else {

                    body = body.toString();
                }
            }
        }

        this.putValue( 'body', body );
        this.putValue( 'isBase64Encoded', base64Encoded );

        return this;
    }

    apiId( id ) {

        return this.putPropertyValue( 'requestContext', 'apiId', id );
    }

    base64Encoded( encoded = true ) {

        return this.putValue( 'isBase64Encoded', encoded );
    }
}

SimpleEventMock.addPutValueHelper( APIGatewayEventMock, 'method', 'httpMethod' );

SimpleEventMock.addPutValueHelper( APIGatewayEventMock, 'headers', 'headers', true );
SimpleEventMock.addPutPropertyValueHelper( APIGatewayEventMock, 'header', 'headers' );

SimpleEventMock.addPutValueHelper( APIGatewayEventMock, 'queryStringParameters', 'queryStringParameters', true );
SimpleEventMock.addPutPropertyValueHelper( APIGatewayEventMock, 'queryStringParameter', 'queryStringParameters' );

module.exports = APIGatewayEventMock;