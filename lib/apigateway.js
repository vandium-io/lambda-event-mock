'use strict';

const SimpleEventMock = require( './simple' );

const utils = require( './utils' );

class APIGatewayEventMock extends SimpleEventMock {

    constructor() {

        super( 'apigateway' );
    }

    path( path ) {

        this.putValue( 'path', path );
        this.putValue( 'resource', path );
        this.putPropertyValue( 'requestContext', 'resourcePath', path );

        return this;
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

    header( name, value ) {

        return this.putPropertyValueWithMultipleValue( 'headers', 'multiValueHeaders', name, value );
    }

    queryStringParameter( name, value ) {

        return this.putPropertyValueWithMultipleValue( 'queryStringParameters', 'multiValueQueryStringParameters', name, value );
    }

    putPropertyValueWithMultipleValue( objectName, multiObjectName, name, value ) {

        this.putPropertyValue( objectName, name, value, false /*no overwrite*/ );

        let multiValueObject = this.getOrCreateObject( multiObjectName );

        let existing = multiValueObject[ name ] || [];

        multiValueObject[ name ] = [ ...existing, value ];

        return this;
    }
}

SimpleEventMock.addPutValueHelper( APIGatewayEventMock, 'method', 'httpMethod' );

SimpleEventMock.addPutPropertyValueObjectHelper( APIGatewayEventMock, 'headers', 'header' );
SimpleEventMock.addPutPropertyValueObjectHelper( APIGatewayEventMock, 'queryStringParameters', 'queryStringParameter' );

SimpleEventMock.addPutValueHelper( APIGatewayEventMock, 'stageVariables', 'stageVariables', true );
SimpleEventMock.addPutPropertyValueHelper( APIGatewayEventMock, 'stageVariable', 'stageVariables' );

SimpleEventMock.addPutValueHelper( APIGatewayEventMock, 'pathParameters', 'pathParameters', true );
SimpleEventMock.addPutPropertyValueHelper( APIGatewayEventMock, 'pathParameter', 'pathParameters' );

module.exports = APIGatewayEventMock;
