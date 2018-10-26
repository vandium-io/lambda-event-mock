'use strict';

const SimpleEventMock = require( './simple' );

class ScheduledEventMock extends SimpleEventMock {

    constructor() {

        super( 'scheduled' );
    }
}

SimpleEventMock.addPutValueHelpers( ScheduledEventMock, [

        'account',
        'region',
        [ 'detail', 'detail', true ],
        [ 'detailType', 'detail-type' ],
        'source',
        'time',
        'id',
        'resources'
    ]);

module.exports = ScheduledEventMock;
