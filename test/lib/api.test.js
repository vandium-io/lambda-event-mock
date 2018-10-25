'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const APIEventMock = require( '../../lib/api' );

describe( 'lib/api', function() {

    describe( 'APIEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new APIEventMock().build();

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

                let event = new APIEventMock()
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

                let event = new APIEventMock()
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
