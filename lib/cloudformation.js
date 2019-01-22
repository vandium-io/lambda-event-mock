'use strict';

const SimpleEventMock = require( './simple' );

class CloudformationEventMock extends SimpleEventMock {

    constructor() {

        super( 'cloudformation' );
    }
}

SimpleEventMock.addPutValueHelpers( CloudformationEventMock, [

    ['stackId', 'StackId'],
    ['responseURL', 'ResponseURL'],
    ['requestType', 'RequestType'],
    ['resourceType', 'ResourceType'],
    ['requestId', 'RequestId'],
    ['logicalResourceId', 'LogicalResourceId']
]);

SimpleEventMock.addPutValueHelper( CloudformationEventMock, 'resourceProperties', 'ResourceProperties', true );
SimpleEventMock.addPutPropertyValueHelper( CloudformationEventMock, 'resourceProperty', 'ResourceProperties' );

module.exports = CloudformationEventMock;
