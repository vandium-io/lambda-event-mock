'use strict';

const SimpleEventMock = require( './simple' );

class LexEventMock extends SimpleEventMock {

    constructor() {

        super( 'lex' );
    }
}

SimpleEventMock.addPutValueHelpers( LexEventMock, [

    'invocationSource',
    'userId',
    'sessionAttributes',
    'outputDialogMode',
    'bot',
    'currentIntent'
]);

module.exports = LexEventMock;
