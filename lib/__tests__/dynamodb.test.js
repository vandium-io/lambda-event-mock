'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const DynamoDBEventMock = require( '../dynamodb' );

describe( 'lib/dynamodb', function() {

    describe( 'DynamoDBEventMock', function() {

        describe( '.eventName', function() {

            it( 'normal operation', function() {

                let instance = new DynamoDBEventMock();

                // default
                expect( instance.currentRecord.eventName ).to.equal( 'INSERT' );

                let returnValue = instance.eventName( 'REMOVE' );

                expect( returnValue ).to.equal( instance );
                expect( instance.currentRecord.eventName ).to.equal( 'REMOVE' );
            });
        });

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new DynamoDBEventMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'dynamodb' );
            });

            it( 'validate SizeBytes', function() {

                // sample date from:
                // https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html
                let event1 = new DynamoDBEventMock()
                                .keys( {
                                    Id: {
                                        N: '101'
                                    }
                                })
                                .newImage( {
                                    Message: {
                                        S: 'New item!'
                                    },
                                    Id: {
                                        N: '101'
                                    }
                                })
                                .build();

                expect( event1.Records[0].dynamodb.SizeBytes ).to.equal( 26 );
                expect( eventIdentifier.identify( event1 ).type ).to.equal( 'dynamodb' );

                let event2 = new DynamoDBEventMock()
                                    .keys( {
                                      "Id": {
                                        "N": "101"
                                      }
                                    })
                                    .oldImage( {
                                      "Message": {
                                        "S": "New item!"
                                      },
                                      "Id": {
                                        "N": "101"
                                      }
                                    })
                                    .newImage( {
                                      "Message": {
                                        "S": "This item has changed"
                                      },
                                      "Id": {
                                        "N": "101"
                                      }
                                    })
                                    .build();

                expect( event2.Records[0].dynamodb.SizeBytes ).to.equal( 59 );
                expect( eventIdentifier.identify( event2 ).type ).to.equal( 'dynamodb' );

                let event3 = new DynamoDBEventMock()
                                    .keys( {
                                      Id: {
                                          N: '101'
                                      }
                                    })
                                    .newImage( {
                                        Message: {
                                            SS: ['Item1','Item2']
                                        },
                                        Counts: {
                                            NS: ['1','2']
                                        },
                                        Data: {
                                            BS: ['dGVzdA==']
                                        },
                                        Nice: {
                                            BOOL: true
                                        },
                                        Id: {
                                            N: '101'
                                        }
                                    })
                                    .build();

                expect( event3.Records[0].dynamodb.SizeBytes ).to.equal( 45 );
                expect( eventIdentifier.identify( event3 ).type ).to.equal( 'dynamodb' );
            });

            it( 'validate StreamViewType', function() {

                // sample date from:
                // https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html
                let event1 = new DynamoDBEventMock()
                                .keys( {
                                    Id: {
                                        N: '101'
                                    }
                                })
                                .build();

                expect( event1.Records[0].dynamodb.StreamViewType ).to.equal( 'KEYS_ONLY' );
                expect( eventIdentifier.identify( event1 ).type ).to.equal( 'dynamodb' );

                let event2 = new DynamoDBEventMock()
                                    .keys( {
                                      "Id": {
                                        "N": "101"
                                      }
                                    })
                                    .oldImage( {
                                      "Message": {
                                        "S": "New item!"
                                      },
                                      "Id": {
                                        "N": "101"
                                      }
                                    })
                                    .build();

                expect( event2.Records[0].dynamodb.StreamViewType ).to.equal( 'OLD_IMAGE' );
                expect( eventIdentifier.identify( event2 ).type ).to.equal( 'dynamodb' );

                let event3 = new DynamoDBEventMock()
                                    .keys( {
                                      Id: {
                                          N: '101'
                                      }
                                    })
                                    .newImage( {
                                        Message: {
                                            S: 'New item!'
                                        },
                                        Id: {
                                            N: '101'
                                        }
                                    })
                                    .build();

                expect( event3.Records[0].dynamodb.StreamViewType ).to.equal( 'NEW_IMAGE' );
                expect( eventIdentifier.identify( event3 ).type ).to.equal( 'dynamodb' );

                let event4 = new DynamoDBEventMock()
                                    .keys( {
                                      "Id": {
                                        "N": "101"
                                      }
                                    })
                                    .oldImage( {
                                      "Message": {
                                        "S": "New item!"
                                      },
                                      "Id": {
                                        "N": "101"
                                      }
                                    })
                                    .newImage( {
                                      "Message": {
                                        "S": "This item has changed"
                                      },
                                      "Id": {
                                        "N": "101"
                                      }
                                    })
                                    .build();

                expect( event4.Records[0].dynamodb.StreamViewType ).to.equal( 'NEW_AND_OLD_IMAGES' );
                expect( eventIdentifier.identify( event4 ).type ).to.equal( 'dynamodb' );
            });
        });
    });
});
