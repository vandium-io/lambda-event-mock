'use strict';

const RecordEventMock = require( './record' );

class S3EventMock extends RecordEventMock {

    constructor() {

        super( 's3' );
    }

    configurationId( id ) {

        return this.putObjectValue( 'configurationId', id );
    }

    object( key, additional = {} ) {

        return this.assignObjectValue( 'object', { key }, additional );
    }

    bucket( name, additional = {} ) {

        return this.assignObjectValue( 'bucket', { name }, additional );
    }

    eventName( name ) {

        return this.putObjectValue( 'eventName', name );
    }
}

module.exports = S3EventMock;
