'use strict';

function addMock( mockName, mockModuleName = mockName ) {

    let mockClass = require( `./${mockModuleName}` );

    module.exports[ mockName ] = function() {

        return new mockClass();
    }
}

addMock( 'apigateway' );
addMock( 's3' );
addMock( 'scheduled' );
addMock( 'sns' );
addMock( 'sqs' );
