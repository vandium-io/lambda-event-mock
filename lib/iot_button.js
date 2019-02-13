'use strict';

const SimpleEventMock = require( './simple' );

class IoTButtonEventMock extends SimpleEventMock {

    constructor() {

        super( 'iot-button' );
    }
}

SimpleEventMock.addPutValueHelpers( IoTButtonEventMock, [

    'serialNumber',
    'clickType',
    'batteryVoltage'
]);

module.exports = IoTButtonEventMock;
