'use strict'

const EventMock = require( './event' );

const templates = require( './templates' );

class SimpleEventMock extends EventMock {

    constructor( templateName, helpers = [] ) {

        super( templates[ templateName ] );

        this._addPutValueHelpers( helpers );
    }
}

module.exports = SimpleEventMock;
