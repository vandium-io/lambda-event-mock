'use strict';

const EventMock = require( './event' );

const templates = require( './templates' );

class RecordEventMock extends EventMock {

    constructor( objectName, templateName = objectName ) {

        super( templates[ templateName ] );

        this._objectName = objectName;

        this._recordTemplater = templates[ `${templateName}_record` ];
    }

    next() {

        this.updateCurrentRecord();

        let record = this._createRecord();

        this.records.push( record );

        return this;
    }

    get currentRecord() {

        this._initRecords();

        return this._getCurrentRecord();
    }

    get records() {

        return this._getRecordsArray( this._event );
    }

    recordValue( name, value ) {

        this.currentRecord[ name ] = value;

        return this;
    }

    get objectValue() {

        return this.currentRecord[ this._objectName ];
    }

    putObjectValue( name, value ) {

        this.objectValue[ name ] = value;

        return this;
    }

    assignObjectValue( objectName, ...updatedValues ) {

        let updatedValue = Object.assign( {}, this.objectValue[ objectName ], ...updatedValues );

        return this.putObjectValue( objectName, updatedValue );
    }

    updateCurrentRecord() {

        let current = this._getCurrentRecord();

        if( current ) {

            this._updateRecord( current );
        }
    }

    build() {

        this._initRecords();

        this.updateCurrentRecord();

        return super.build();
    }

    _createRecord() {

        return this._recordTemplater.render();
    }

    _updateRecord( /* record */ ) {

        // does nothing
    }

    _getCurrentRecord() {

        let records = this.records;

        return records[ records.length-1 ];
    }

    _initRecords() {

        if( this.records.length === 0 ) {

            this.next();
        }
    }

    _getRecordsArray( event ) {

        return event.Records;
    }

}

module.exports = RecordEventMock;
