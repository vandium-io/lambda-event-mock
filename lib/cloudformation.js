'use strict';

const SimpleEventMock = require( './simple' );

class CloudformationEventMock extends SimpleEventMock {

    constructor() {

        super( 'cloudformation' );
    }
}

SimpleEventMock.addPutValueHelpers( CloudformationEventMock, [

    'StackId',
    'ResponseURL',
    'RequestType',
    'ResourceType',
    'RequestId',
    'LogicalResourceId'
]);

module.exports = CloudformationEventMock;
