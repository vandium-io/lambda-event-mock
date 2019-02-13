'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const KinesisEventMock = require( '../../lib/kinesis' );

describe( 'lib/kinesis', function() {

    describe( 'KinesisEventMock', function() {

        describe( '.data', function() {

            it( 'normal operation', function() {

                let instance = new KinesisEventMock();

                let returnValue = instance.data( 'dGVzdGluZw==' );

                expect( returnValue ).to.equal( instance );
                expect( instance._event.Records[0].kinesis.data ).to.equal( 'dGVzdGluZw==' );
            });
        });

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new KinesisEventMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'kinesis' );
            });

            it( 'normal operation', function() {

                let event = new KinesisEventMock()
                                    .data( 'dGVzdGluZw==' )
                                    .build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'kinesis' );

                expect( event.Records[0].kinesis.data ).to.equal( 'dGVzdGluZw==' );
            });
        });
    });
});
