'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const FirehoseEventMock = require( '../firehose' );

describe( 'lib/firehose', function() {

    describe( 'FirehoseEventMock', function() {

        describe( '.data', function() {

            it( 'normal operation', function() {

                let instance = new FirehoseEventMock();

                let returnValue = instance.data( 'dGVzdGluZw==' );

                expect( returnValue ).to.equal( instance );
                expect( instance._event.records[0].data ).to.equal( 'dGVzdGluZw==' );
            });
        });

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new FirehoseEventMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'kinesis-firehose' );

                expect( event.invocationId ).to.exist;
                expect( event.deliveryStreamArn ).to.exist;
                expect( event.region ).to.exist;
                expect( event.records ).to.exist;

                expect( event.Records ).to.not.exist;
            });

            it( 'multiple records', function() {

                let event = new FirehoseEventMock().next().next().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'kinesis-firehose' );

                expect( event.records.length ).to.equal( 2 );
                expect( event.records[0].recordId ).to.equal( 'record1' );
                expect( event.records[1].recordId ).to.equal( 'record2' );
            });
        });
    });
});
