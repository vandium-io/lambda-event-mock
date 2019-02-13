'use strict';

const SimpleEventMock = require( './simple' );

class CloudwatchLogsMock extends SimpleEventMock {

    constructor() {

        super( 'cloudwatch-logs' );
    }

    data( value ) {

        return super.putPropertyValue( 'awslogs', 'data', value );
    }
}

module.exports = CloudwatchLogsMock;
