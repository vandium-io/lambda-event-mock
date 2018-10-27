'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const CognitoEventMock = require( '../../lib/cognito' );

describe( 'lib/cognito', function() {

    describe( 'CognitoEventMock', function() {

        describe( '.dataset', function() {

            it( 'normal operation', function() {

                let instance = new CognitoEventMock();

                let returnValue = instance.dataset( 'MyKey', {
                    newValue: 'one', oldValue: '1', op: 'replace' } );

                expect( returnValue ).to.equal( instance );
                expect( instance._event.datasetRecords.MyKey ).to.eql( {
                    newValue: 'one', oldValue: '1', op: 'replace' } );
            });
        });

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new CognitoEventMock().build();

                expect( eventIdentifier.identify( event ) ).to.equal( 'cognito' );
            });

            it( 'normal operation', function() {

                let event = new CognitoEventMock()
                                    .datasetName( 'my-dataset' )
                                    .eventType( 'my-event-type' )
                                    .region( 'us-west-1' )
                                    .dataset( 'MyKey', {
                                        newValue: 'one', oldValue: '1', op: 'replace' } )
                                    .identityId( 'my-id' )
                                    .identityPoolId( 'my-id-pool' )
                                    .build();

                expect( event.datasetName ).to.equal( 'my-dataset' );
                expect( event.eventType ).to.equal( 'my-event-type' );
                expect( event.region ).to.equal( 'us-west-1' );
                expect( event.datasetRecords ).to.eql( {

                    MyKey: {
                        newValue: 'one', oldValue: '1', op: 'replace'
                    }
                });
                expect( event.identityId ).to.equal( 'my-id' );
                expect( event.identityPoolId ).to.equal( 'my-id-pool' );
            });
        });
    });
});
