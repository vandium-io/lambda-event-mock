'use strict';

const SimpleEventMock = require( './simple' );

const utils = require( './utils' );

class APIGatewayEventMock extends SimpleEventMock {

    constructor() {

        super( 'apigateway' );

        this._addPutValueHelper( 'method', 'httpMethod' );

        this._addPutValueHelper( 'headers', 'headers', true );
        this._addPutPropertyValueHelper( 'header', 'headers' );

        this._addPutValueHelper( 'queryStringParameters', 'queryStringParameters', true );
        this._addPutPropertyValueHelper( 'queryStringParameter', 'queryStringParameters' );
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


module.exports = APIGatewayEventMock;
