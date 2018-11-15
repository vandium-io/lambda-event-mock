'use strict';

const SimpleEventMock = require( './simple' );

class IoTButtonEventMock extends SimpleEventMock {

    constructor() {

        super( 'iotButton' );
    }
}

SimpleEventMock.addPutValueHelpers( IoTButtonEventMock, [

    'serialNumber',
    'clickType',
    'batteryVoltage'
]);

module.exports = IoTButtonEventMock;
