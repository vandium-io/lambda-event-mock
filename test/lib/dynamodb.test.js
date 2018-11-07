'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const DynamoDBEventMock = require( '../../lib/dynamodb' );

describe( 'lib/dynamodb', function() {

    describe( 'DynamoDBEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new DynamoDBEventMock().build();

                console.log( event );
            });

            it( 'normal operation', function() {

                let event = new DynamoDBEventMock()
                                .keys( {
                                    Id: {
                                        N: '101'
                                    }
                                })
                                .newImage( {
                                    Message: {
                                        S: 'New item!'
                                    },
                                    Id: {
                                        N: '101'
                                    }
                                })
                                .build();

                expect( event.Records[0].SizeBytes ).to.equal( 26 );
            });
        });
    });
});
