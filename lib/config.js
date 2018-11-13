'use strict';

const SimpleEventMock = require( './simple' );

class ConfigEventMock extends SimpleEventMock {

    constructor() {

        super( 'config' );
    }
}

SimpleEventMock.addPutValueHelpers( ConfigEventMock, [

    'configRuleArn',
    'configRuleName',
    'configRuleId',
    'executionRoleArn',
    'invokingEvent',
    'resultToken',
    'ruleParameters'
]);

module.exports = ConfigEventMock;
