'use strict';

const EventMock = require( './event' );

const templates = require( './templates' );

class RecordEventMock extends EventMock {

    constructor( objectName, templateName = objectName ) {

        super( templates[ templateName ] );

        this._objectName = objectName;

        this._recordTemplater = templates[ `${templateName}_record` ];

        // create first record
        this.next();
    }

    next() {

        let record = this._createRecord();

        this._event.Records.push( record );

        return this;
    }

    get currentRecord() {

        return this._event.Records[ this._event.Records.length-1 ];
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

    assignObjectValue( name, ...updated ) {

        let existing = this.objectValue[ name ] || {};

        return this.putObjectValue( name, Object.assign( existing, ...updated ) );
    }

    _createRecord() {

        return this._recordTemplater.render();
    }
}

module.exports = RecordEventMock;
