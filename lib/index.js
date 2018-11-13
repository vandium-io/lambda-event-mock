'use strict';

[
    'apigateway',
    'cloudformation',
    'cloudwatch',
    'cognito',
    'config',
    's3',
    'scheduled',
    'sns',
    'sqs'

].forEach( (mockName) => {

    let mockModuleName = mockName;
    let mockClass = require( `./${mockModuleName}` );

    module.exports[ mockName ] = function() {

        return new mockClass();
    }
});
