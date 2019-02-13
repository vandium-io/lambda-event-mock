'use strict';

const SimpleEventMock = require( './simple' );

class CloudWatchEventMock extends SimpleEventMock {

    constructor() {

        super( 'cloudwatch' );
    }
}

SimpleEventMock.addPutValueHelpers( CloudWatchEventMock, [

        'account',
        'region',
        [ 'detail', 'detail', true ],
        [ 'detailType', 'detail-type' ],
        'source',
        'time',
        'id',
        'resources'
    ]);

module.exports = CloudWatchEventMock;
