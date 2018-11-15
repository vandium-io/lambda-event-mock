'use strict';

[
    'apigateway',
    'cloudformation',
    'cloudwatch',
    'cognito',
    'config',
    'dynamodb',
    'firehose',
    ['iotButton', 'iot_button'],
    'kinesis',
    's3',
    'scheduled',
    'sns',
    'sqs'

].forEach( (moduleInfo) => {

    let name = moduleInfo;
    let mockModuleName = moduleInfo;

    if( Array.isArray( moduleInfo ) ) {

        name = moduleInfo[0];
        mockModuleName = moduleInfo[1];
    }

    let mockClass = require( `./${mockModuleName}` );

    module.exports[ name ] = function() {

        return new mockClass();
    }
});
