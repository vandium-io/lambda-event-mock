'use strict'

const EventMock = require( './event' );

const templates = require( './templates' );

class SimpleEventMock extends EventMock {

    constructor( templateName ) {

        super( templates[ templateName ] );
    }
}

module.exports = SimpleEventMock;
