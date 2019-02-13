'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const IoTButtonEventMock = require( '../../lib/iot_button' );

describe( 'lib/config', function() {

    describe( 'IoTButtonEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new IoTButtonEventMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'iot-button' );
            });

            it( 'normal operation', function() {

                'serialNumber',
                'clickType',
                'batteryVoltage'

                let event = new IoTButtonEventMock()
                                    .serialNumber( 'my-serial-number' )
                                    .clickType( 'DOUBLE' )
                                    .batteryVoltage( '5000 mV' )
                                    .build();

                expect( event.serialNumber ).to.equal( 'my-serial-number' );
                expect( event.clickType ).to.equal( 'DOUBLE' );
                expect( event.batteryVoltage ).to.eql( '5000 mV' );

                expect( eventIdentifier.identify( event ).type ).to.equal( 'iot-button' );
            });
        });
    });
});
