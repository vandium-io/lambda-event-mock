'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const APIGatewayEventMock = require( '../../lib/apigateway' );

describe( 'lib/api', function() {

    describe( 'APIGatewayEventMock', function() {

        describe( 'constructor', function() {

            let instance = new APIGatewayEventMock();

            expect( instance.method ).to.exist;
            expect( instance.headers ).to.exist;
            expect( instance.queryStringParameter ).to.exist;
            expect( instance.queryStringParameters ).to.exist;
        });

        describe( '.path', function() {

            it( 'normal operation', function() {

                let instance = new APIGatewayEventMock();

                let returnValue = instance.path( '/whatever' );
                expect( returnValue ).to.equal( instance );

                expect( instance._event.path ).to.equal( '/whatever' );
                expect( instance._event.resource ).to.equal( '/whatever' );
            });
        });

        describe( '.body', function() {

            it( 'body is a string', function() {

                let instance = new APIGatewayEventMock();

                let returnValue = instance.body( 'my-body' );
                expect( returnValue ).to.equal( instance );

                expect( instance._event.body ).to.equal( 'my-body' );
                expect( instance._event.isBase64Encoded ).to.be.false;
            });

            it( 'body is a buffer', function() {

                let instance = new APIGatewayEventMock();

                let returnValue = instance.body( new Buffer( 'my-body' ) );
                expect( returnValue ).to.equal( instance );

                expect( instance._event.body ).to.equal( new Buffer( 'my-body' ).toString( 'base64' ) );
                expect( instance._event.isBase64Encoded ).to.be.true;
            });

            it( 'body is an object', function() {

                let instance = new APIGatewayEventMock();

                let returnValue = instance.body( { one:1, two: 'two' } );
                expect( returnValue ).to.equal( instance );

                expect( instance._event.body ).to.equal( '{"one":1,"two":"two"}' );
                expect( instance._event.isBase64Encoded ).to.be.false;
            });

            it( 'body not set', function() {

                let instance = new APIGatewayEventMock();

                let returnValue = instance.body( null );
                expect( returnValue ).to.equal( instance );

                expect( instance._event.body ).to.be.null;
                expect( instance._event.isBase64Encoded ).to.be.false;
            });

            it( 'no parameters', function() {

                let instance = new APIGatewayEventMock();

                let returnValue = instance.body();
                expect( returnValue ).to.equal( instance );

                expect( instance._event.body ).to.equal( '{}' );
                expect( instance._event.isBase64Encoded ).to.be.false;
            });
        });

        describe( '.apiId', function() {

            it( 'normal operation', function() {

                let instance = new APIGatewayEventMock();

                let returnValue = instance.apiId( '1234' );
                expect( returnValue ).to.equal( instance );

                expect( instance._event.requestContext.apiId ).to.equal( '1234' );
            });
        });

        describe( '.base64Encoded', function() {

            it( 'normal operation', function() {

                let instance = new APIGatewayEventMock();

                let returnValue = instance.base64Encoded( true );
                expect( returnValue ).to.equal( instance );

                expect( instance._event.isBase64Encoded ).to.be.true;

                instance.base64Encoded( false );
                expect( instance._event.isBase64Encoded ).to.be.false;

                instance.base64Encoded();
                expect( instance._event.isBase64Encoded ).to.be.true;
            });
        });

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new APIGatewayEventMock().build();

                expect( event.resource ).to.equal( '/' );
                expect( event.path ).to.equal( '/' );
                expect( event.httpMethod ).to.equal( 'GET' );
                expect( event.headers ).to.be.null;
                expect( event.queryStringParameters ).to.be.null;
                expect( event.pathParameters ).to.be.null;
                expect( event.stageVariables ).to.be.null;
                expect( event.requestContext ).to.exist;
                expect( event.requestContext.resourcePath ).to.equal( '/' );
                expect( event.requestContext.apiId ).to.equal( '00aaa0a00a' );
                expect( event.body ).to.be.null;
                expect( event.isBase64Encoded ).to.be.false;

                expect( eventIdentifier.identify( event ) ).to.equal( 'apigateway' );
            });

            it( 'simple', function() {

                let event = new APIGatewayEventMock()
                                    .method( 'POST' )
                                    .body( { one: 1, two: 2 } )
                                    .queryStringParameter( 'expanded', true )
                                    .build();

                expect( event.resource ).to.equal( '/' );
                expect( event.path ).to.equal( '/' );
                expect( event.httpMethod ).to.equal( 'POST' );
                expect( event.headers ).to.be.null;
                expect( event.queryStringParameters ).to.eql( { expanded: true } );
                expect( event.pathParameters ).to.be.null;
                expect( event.stageVariables ).to.be.null;
                expect( event.requestContext ).to.exist;
                expect( event.requestContext.resourcePath ).to.equal( '/' );
                expect( event.requestContext.apiId ).to.equal( '00aaa0a00a' );
                expect( event.body ).to.equal( '{"one":1,"two":2}');
                expect( event.isBase64Encoded ).to.be.false;

                expect( eventIdentifier.identify( event ) ).to.equal( 'apigateway' );
            });

            it( 'buffer body', function() {

                let event = new APIGatewayEventMock()
                                    .method( 'POST' )
                                    .body( new Buffer( JSON.stringify( { one: 1, two: 2 } ) ) )
                                    .queryStringParameter( 'expanded', true )
                                    .build();

                expect( event.resource ).to.equal( '/' );
                expect( event.path ).to.equal( '/' );
                expect( event.httpMethod ).to.equal( 'POST' );
                expect( event.headers ).to.be.null;
                expect( event.queryStringParameters ).to.eql( { expanded: true } );
                expect( event.pathParameters ).to.be.null;
                expect( event.stageVariables ).to.be.null;
                expect( event.requestContext ).to.exist;
                expect( event.requestContext.resourcePath ).to.equal( '/' );
                expect( event.requestContext.apiId ).to.equal( '00aaa0a00a' );
                expect( event.body ).to.equal( new Buffer( '{"one":1,"two":2}' ).toString( 'base64' ) );
                expect( event.isBase64Encoded ).to.be.true;

                expect( eventIdentifier.identify( event ) ).to.equal( 'apigateway' );
            });
        });
    });
});
