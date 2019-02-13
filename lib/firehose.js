'use strict';

const RecordEventMock = require( './record' );

class FirehoseEventMock extends RecordEventMock {

    constructor() {

        super( 'kinesisRecordMetadata', 'kinesis-firehose' );

        this._nextID =1;
    }

    data( d ) {

        return this.recordValue( 'data', d );
    }

    _getRecordsArray( event ) {

        return event.records;
    }

    _createRecord() {

        let record = super._createRecord();

        record.recordId = `record${this._nextID++}`;

        return record;
    }
}

module.exports = FirehoseEventMock;
