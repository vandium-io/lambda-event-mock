'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const CloudwatchEventMock = require( '../../lib/cloudwatch' );

describe( 'lib/cloudwatch', function() {

    describe( 'CloudwatchEventMock', function() {

        describe( '.data', function() {

            it( 'normal operation', function() {

                let instance = new CloudwatchEventMock();

                let returnValue = instance.data( 'my-data' );

                expect( returnValue ).to.equal( instance );
                expect( instance._event.awslogs.data ).to.equal( 'my-data' );
            });
        });

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new CloudwatchEventMock().build();

                expect( eventIdentifier.identify( event ) ).to.equal( 'cloudwatch' );
            });

            xit( 'normal operation', function() {

                let event = new CloudwatchEventMock()
                                    .data( 'my-data' )
                                    .build();

                expect( event.awslogs ).to.eql( { data: 'my-data' } );

                expect( eventIdentifier.identify( event ) ).to.equal( 'cloudwatch' );
            });
        });
    });
});
