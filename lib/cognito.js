'use strict';

const SimpleEventMock = require( './simple' );

class CognitoEventMock extends SimpleEventMock {

    constructor() {

        super( 'cognito' );
    }

    dataset( name, record ) {

        return super.putPropertyValue( 'datasetRecords', name, record );
    }
}

SimpleEventMock.addPutValueHelpers( CognitoEventMock, [

    'datasetName',
    'eventType',
    'region',
    'identityId',
    'identityPoolId'
]);

module.exports = CognitoEventMock;
