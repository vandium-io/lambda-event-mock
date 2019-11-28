'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const ConfigEventMock = require( '../config' );

describe( 'lib/config', function() {

    describe( 'ConfigEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new ConfigEventMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'config' );
            });

            it( 'normal operation', function() {

                let event = new ConfigEventMock()
                                    .configRuleArn( 'my-config-rule-arn' )
                                    .configRuleName( 'my-config-rule-name' )
                                    .configRuleId( 'my-config-rule-id' )
                                    .executionRoleArn( 'my-exection-role-arn' )
                                    .invokingEvent( 'my-invoking-event' )
                                    .resultToken( 'my-result-token' )
                                    .ruleParameters( 'my-rule-parameters' )
                                    .build();

                expect( event.configRuleArn ).to.equal( 'my-config-rule-arn' );
                expect( event.configRuleName ).to.equal( 'my-config-rule-name' );
                expect( event.configRuleId ).to.eql( 'my-config-rule-id' );
                expect( event.executionRoleArn ).to.equal( 'my-exection-role-arn' );
                expect( event.invokingEvent ).to.equal( 'my-invoking-event' );
                expect( event.resultToken ).to.equal( 'my-result-token' );
                expect( event.ruleParameters ).to.equal( 'my-rule-parameters' );

                expect( eventIdentifier.identify( event ).type ).to.equal( 'config' );
            });
        });
    });
});
