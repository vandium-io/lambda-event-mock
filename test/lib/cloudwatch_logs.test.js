'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const CloudwatchLogsMock = require( '../../lib/cloudwatch_logs' );

describe( 'lib/cloudwatch_logs', function() {

    describe( 'CloudwatchLogsMock', function() {

        describe( '.data', function() {

            it( 'normal operation', function() {

                let instance = new CloudwatchLogsMock();

                let returnValue = instance.data( 'my-data' );

                expect( returnValue ).to.equal( instance );
                expect( instance._event.awslogs.data ).to.equal( 'my-data' );
            });
        });

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new CloudwatchLogsMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'cloudwatch' );
                expect( eventIdentifier.identify( event ).source ).to.equal( 'logs' );
            });

            it( 'normal operation', function() {

                let event = new CloudwatchLogsMock()
                                    .data( 'my-data' )
                                    .build();

                expect( event.awslogs ).to.eql( { data: 'my-data' } );

                expect( eventIdentifier.identify( event ).type ).to.equal( 'cloudwatch' );
                expect( eventIdentifier.identify( event ).source ).to.equal( 'logs' );
            });
        });
    });
});
