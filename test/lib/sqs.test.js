'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const crypto = require( 'crypto' );

const eventIdentifier = require( '@vandium/event-identifier' );

const SQSEventMock = require( '../../lib/sqs' );

describe( 'lib/sqs', function() {

    describe( 'SQSEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new SQSEventMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'sqs' );
            });

            it( 'normal operation', function() {

                let event = new SQSEventMock()
                                    .messageId( '1234' )
                                    .receiptHandle( 'handle-here' )
                                    .eventSourceARN( 'arn-here' )
                                    .body( 'body-here' )
                                    .build();

                expect( event.Records[0].messageId ).to.equal( '1234' );
                expect( event.Records[0].receiptHandle ).to.equal( 'handle-here' );
                expect( event.Records[0].eventSourceARN ).to.eql( 'arn-here' );
                expect( event.Records[0].body ).to.equal( 'body-here' );
                expect( event.Records[0].md5OfBody ).to.equal( crypto.createHash( 'md5' ).update( event.Records[0].body ).digest( 'hex' ) );

                expect( eventIdentifier.identify( event ).type ).to.equal( 'sqs' );
            });

            it( 'normal operation, body is a buffer', function() {

                let event = new SQSEventMock()
                                    .messageId( '1234' )
                                    .receiptHandle( 'handle-here' )
                                    .eventSourceARN( 'arn-here' )
                                    .body( new Buffer( 'body-here' ) )
                                    .build();

                expect( event.Records[0].messageId ).to.equal( '1234' );
                expect( event.Records[0].receiptHandle ).to.equal( 'handle-here' );
                expect( event.Records[0].eventSourceARN ).to.eql( 'arn-here' );
                expect( event.Records[0].body ).to.equal( new Buffer( 'body-here' ).toString( 'base64') );
                expect( event.Records[0].md5OfBody ).to.equal( crypto.createHash( 'md5' ).update( event.Records[0].body ).digest( 'hex' ) );

                expect( eventIdentifier.identify( event ).type ).to.equal( 'sqs' );
            });
        });
    });
});
