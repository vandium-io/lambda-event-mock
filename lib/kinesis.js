'use strict';

const RecordEventMock = require( './record' );

class KinesisEventMock extends RecordEventMock {

    constructor() {

        super( 'kinesis' );
    }

    data( d ) {

        return this.putObjectValue( 'data', d );
    }
}

module.exports = KinesisEventMock;
