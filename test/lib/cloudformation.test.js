'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const CloudformationEventMock = require( '../../lib/cloudformation' );

describe( 'lib/cloudformation', function() {

    describe( 'CloudformationEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new CloudformationEventMock().build();

                expect( eventIdentifier.identify( event ) ).to.equal( 'cloudformation' );
            });

            it( 'normal operation', function() {

                let event = new CloudformationEventMock()
                                    .stackId( 'my-stack-id' )
                                    .responseURL( 'my-responseURL' )
                                    .requestType( 'my-requestType' )
                                    .requestId( 'my-requestId' )
                                    .resourceProperty( 'StackName', 'my-stack' )
                                    .resourceProperties( { other: 'test' } )
                                    .logicalResourceId( 'my-requestId' )
                                    .build();

                expect( event.StackId ).to.equal( 'my-stack-id' );
                expect( event.ResponseURL ).to.equal( 'my-responseURL' );
                expect( event.RequestType ).to.eql( 'my-requestType' );
                expect( event.RequestId ).to.equal( 'my-requestId');
                expect( event.LogicalResourceId ).to.equal( 'my-requestId' );

                console.log( event );
                expect( event.ResourceProperties ).to.eql( { StackName: 'my-stack', other: 'test' } );

                expect( eventIdentifier.identify( event ) ).to.equal( 'cloudformation' );
            });
        });
    });
});
