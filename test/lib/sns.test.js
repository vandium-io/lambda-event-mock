'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const SNSEventMock = require( '../../lib/sns' );

describe( 'lib/sns', function() {

    describe( 'SNSEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new SNSEventMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'sns' );
            });

            it( 'normal operation', function() {

                let event = new SNSEventMock()
                                    .subject( 'my-subject' )
                                    .signature( 'XXXX' )
                                    .signingCert( 'TEST' )
                                    .messageId( '1234' )
                                    .message( 'message-here' )
                                    .messageAttributes( { whatever: 'abc' } )
                                    .messageAttribute( 'other', 'def' )
                                    .topic( 'topic-arn-here' )
                                    .type( 'Type-Here' )
                                    .eventSubscription( 'event-arn-here' )
                                    .build();

                expect( event.Records ).to.be.an( 'Array' );
                expect( event.Records.length ).to.equal( 1 );

                expect( event.Records[0].EventSubscriptionArn ).to.equal( 'event-arn-here' );

                expect( event.Records[0].Sns ).to.exist;
                expect( event.Records[0].Sns.Subject ).to.equal( 'my-subject' );
                expect( event.Records[0].Sns.TopicArn ).to.equal( 'topic-arn-here' );
                expect( event.Records[0].Sns.Type ).to.equal( 'Type-Here' );
                expect( event.Records[0].Sns.MessageId ).to.equal( '1234' );
                expect( event.Records[0].Sns.Message ).to.equal( 'message-here' );
                expect( event.Records[0].Sns.MessageAttributes ).to.eql( {

                        whatever: 'abc',
                        other: 'def'
                    });
                expect( event.Records[0].Sns.SignatureVersion ).to.equal( '1' );
                expect( event.Records[0].Sns.Signature ).to.equal( 'XXXX' );
                expect( event.Records[0].Sns.SigningCertUrl ).to.equal( 'TEST' );

                expect( eventIdentifier.identify( event ).type ).to.equal( 'sns' );
            });


            it( 'multiple records', function() {

                let event = new SNSEventMock()
                                    .subject( 'my-subject' )
                                    .signature( 'XXXX' )
                                    .signingCert( 'TEST' )
                                    .messageId( '1234' )
                                    .message( 'message-here' )
                                    .messageAttributes( { whatever: 'abc' } )
                                    .messageAttribute( 'other', 'def' )
                                    .topic( 'topic-arn-here' )
                                    .type( 'Type-Here' )
                                    .eventSubscription( 'event-arn-here' )
                                    .next()
                                    .subject( 'my-subject-2' )
                                    .signature( 'XXXX-2' )
                                    .signingCert( 'TEST-2' )
                                    .messageId( '1234-2' )
                                    .message( 'message-here-2' )
                                    .messageAttributes( { whatever: 'abc-2' } )
                                    .messageAttribute( 'other', 'def-2' )
                                    .topic( 'topic-arn-here-2' )
                                    .type( 'Type-Here-2' )
                                    .eventSubscription( 'event-arn-here-2' )
                                    .build();

                expect( event.Records ).to.be.an( 'Array' );
                expect( event.Records.length ).to.equal( 2 );

                expect( event.Records[0].EventSubscriptionArn ).to.equal( 'event-arn-here' );

                expect( event.Records[0].Sns ).to.exist;
                expect( event.Records[0].Sns.Subject ).to.equal( 'my-subject' );
                expect( event.Records[0].Sns.TopicArn ).to.equal( 'topic-arn-here' );
                expect( event.Records[0].Sns.Type ).to.equal( 'Type-Here' );
                expect( event.Records[0].Sns.MessageId ).to.equal( '1234' );
                expect( event.Records[0].Sns.Message ).to.equal( 'message-here' );
                expect( event.Records[0].Sns.MessageAttributes ).to.eql( {

                        whatever: 'abc',
                        other: 'def'
                    });
                expect( event.Records[0].Sns.SignatureVersion ).to.equal( '1' );
                expect( event.Records[0].Sns.Signature ).to.equal( 'XXXX' );
                expect( event.Records[0].Sns.SigningCertUrl ).to.equal( 'TEST' );

                expect( event.Records[1].EventSubscriptionArn ).to.equal( 'event-arn-here-2' );

                expect( event.Records[1].Sns ).to.exist;
                expect( event.Records[1].Sns.Subject ).to.equal( 'my-subject-2' );
                expect( event.Records[1].Sns.TopicArn ).to.equal( 'topic-arn-here-2' );
                expect( event.Records[1].Sns.Type ).to.equal( 'Type-Here-2' );
                expect( event.Records[1].Sns.MessageId ).to.equal( '1234-2' );
                expect( event.Records[1].Sns.Message ).to.equal( 'message-here-2' );
                expect( event.Records[1].Sns.MessageAttributes ).to.eql( {

                        whatever: 'abc-2',
                        other: 'def-2'
                    });
                expect( event.Records[1].Sns.SignatureVersion ).to.equal( '1' );
                expect( event.Records[1].Sns.Signature ).to.equal( 'XXXX-2' );
                expect( event.Records[1].Sns.SigningCertUrl ).to.equal( 'TEST-2' );

                expect( eventIdentifier.identify( event ).type ).to.equal( 'sns' );
            });
        });
    });
});
