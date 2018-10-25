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

        let record = this._createRecord();

        this._event.Records.push( record );

        return this;
    }

    get currentRecord() {

        let record = this._event.Records[ this._event.Records.length-1 ];

        if( !record ) {

            record = this._createRecord();

            this._event.Records.push( record );
        }

        return record;
    }

    recordValue( name, value ) {

        this.currentRecord[ name ] = value;

        return this;
    }

    putObjectValue( name, value ) {

        this.objectValue[ name ] = value;

        return this;
    }

    assignObjectValue( name, ...updated ) {

        let existing = this.objectValue[ name ];

        return this.putObjectValue( name, Object.assign( existing, ...updated ) );
    }

    get objectValue() {

        return this.currentRecord[ this._objectName ];
    }

    _createRecord() {

        return this._recordTemplater.render();
    }
}

module.exports = RecordEventMock;
