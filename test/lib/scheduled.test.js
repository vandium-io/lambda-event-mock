'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const ScheduledEventMock = require( '../../lib/scheduled' );

describe( 'lib/scheduled', function() {

    describe( 'ScheduledEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new ScheduledEventMock().build();

                expect( event.account ).to.equal( '123456789012' );
                expect( event.region ).to.equal( 'us-east-1' );
                expect( event.detail ).to.eql( {} );
                expect( event[ 'detail-type' ] ).to.equal( 'Scheduled Event' );
                expect( event.source ).to.equal( 'aws.events' );
                expect( event.time ).to.exist;
                expect( event.id ).to.exist;
                expect( event.resources ).to.be.an( 'Array' );
                expect( event.resources ).to.eql( [ 'arn:aws:events:us-east-1:123456789012:rule/my-schedule' ] );

                expect( eventIdentifier.identify( event ) ).to.equal( 'scheduled' );
            });

            it( 'normal operation', function() {

                let event = new ScheduledEventMock()
                                    .account( '1234')
                                    .region( 'canada-eh-1')
                                    .detail( { ok: true } )
                                    .detailType( 'Scheduled')
                                    .source( 'aws.whatever' )
                                    .id( '5678' )
                                    .time( 'now' )
                                    .resources( [] )
                                    .build();

                expect( event.account ).to.equal( '1234' );
                expect( event.region ).to.equal( 'canada-eh-1' );
                expect( event.detail ).to.eql( { ok: true } );
                expect( event[ 'detail-type' ] ).to.equal( 'Scheduled' );
                expect( event.source).to.equal( 'aws.whatever' );
                expect( event.id ).to.equal( '5678' );
                expect( event.time).to.equal( 'now' );
                expect( event.resources ).to.eql( [] );

                expect( eventIdentifier.identify( event ) ).to.equal( 'scheduled' );
            });
        });
    });
});
