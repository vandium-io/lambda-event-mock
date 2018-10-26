'use strict';

const SimpleEventMock = require( './simple' );

class CloudformatiomnEventMock extends SimpleEventMock {

    constructor() {

        super( 'cloudformation' );
    }
}

SimpleEventMock.addPutValueHelpers( CloudformatiomnEventMock, [

    'StackId',
    'ResponseURL',
    'RequestType',
    'ResourceType',
    'RequestId',
    'LogicalResourceId'
]);

module.exports = CloudformatiomnEventMock;
