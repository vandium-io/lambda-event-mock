'use strict';

const SimpleEventMock = require( './simple' );

class CloudwatchEventMock extends SimpleEventMock {

    constructor() {

        super( 'cloudwatch' );
    }

    data( value ) {

        return super.putPropertyValue( 'awslogs', 'data', value );
    }
}

module.exports = CloudwatchEventMock;
