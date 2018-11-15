'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const LexEventMock = require( '../../lib/lex' );

describe( 'lib/config', function() {

    describe( 'LexEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new LexEventMock().build();

                expect( eventIdentifier.identify( event ) ).to.equal( 'lex' );
            });

            it( 'normal operation', function() {

                let event = new LexEventMock()
                                    .invocationSource( 'FulfillmentCodeHook' )
                                    .userId( 'my-user-id' )
                                    .sessionAttributes( { test1: '1' } )
                                    .outputDialogMode( 'VOICE' )
                                    .bot( { name: 'test', alias: 'my-test', version: '2.0' } )
                                    .currentIntent( { name: 'my-intent-name', slots: {}, confirmationStatus: 'Confirmed' } )
                                    .build();

                expect( event.messageVersion ).to.equal( '1.0' );
                expect( event.invocationSource ).to.equal( 'FulfillmentCodeHook' );
                expect( event.userId ).to.eql( 'my-user-id' );
                expect( event.sessionAttributes ).to.eql( { test1: '1' } );
                expect( event.outputDialogMode ).to.equal( 'VOICE' );
                expect( event.bot ).to.eql( { name: 'test', alias: 'my-test', version: '2.0' } );
                expect( event.currentIntent ).to.eql( { name: 'my-intent-name', slots: {}, confirmationStatus: 'Confirmed' } );

                expect( eventIdentifier.identify( event ) ).to.equal( 'lex' );
            });
        });
    });
});
