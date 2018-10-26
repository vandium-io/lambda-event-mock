'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const templates = require( '../../../lib/templates' );


describe( 'lib/templates/index', function() {

    function validateTemplate( name, verifier, type = name ) {

        it( 'normal operation', function() {

            expect( templates[name] ).to.exist;
            expect( templates[name].render ).to.exist;

            let event = templates[ name ].render();

            expect( eventIdentifier.identify( event ) ).to.equal( type );

            verifier( event );
        });
    }

    function validateRecordTemplate( name, verifier, type = name ) {

        it( 'normal operation', function() {

            expect( templates[name] ).to.exist;
            expect( templates[name].render ).to.exist;

            let recordTemplateName = name + '_record';

            expect( templates[ recordTemplateName ] ).to.exist;
            expect( templates[ recordTemplateName ].render ).to.exist;

            let event = templates[ name ].render();
            let record = templates[ recordTemplateName ].render();

            if( event.Records ) {

                expect( event.Records ).to.be.an( 'Array' );
                expect( event.Records.length ).to.equal( 0 );

                event.Records.push( record );
            }
            else {

                expect( event.records ).to.exist;
                expect( event.records ).to.be.an( 'Array' );
                expect( event.records.length ).to.equal( 0 );

                event.records.push( record );
            }

            expect( eventIdentifier.identify( event ) ).to.equal( type );

            verifier( event, record );
        });
    }

    describe( 'simple type events', function() {

        describe( '.apigateway', function() {

            validateTemplate( 'apigateway', (event) => {

                expect( event.path ).to.exist;
                expect( event.httpMethod ).to.exist;
                expect( event.headers ).to.be.null;
                expect( event.queryStringParameters ).to.be.null;
                expect( event.pathParameters ).to.be.null;
                expect( event.stageVariables ).to.be.null;
                expect( event.requestContext ).to.exist;
                expect( event.body ).to.be.null;
                expect( event.isBase64Encoded ).to.be.false;
            });
        });

        describe( '.cloudformation', function() {

            validateTemplate( 'cloudformation', (event) => {

                expect( event.StackId ).to.exist;
                expect( event.ResponseURL ).to.exist;
                expect( event.ResourceProperties ).to.exist;
                expect( event.RequestType ).to.exist;
                expect( event.ResourceType ).to.exist;
                expect( event.RequestId ).to.exist;
                expect( event.LogicalResourceId ).to.exist;
            });
        });

        describe( '.scheduled', function() {

            validateTemplate( 'scheduled', (event) => {

                expect( event.account ).to.exist;
                expect( event.region ).to.exist;
                expect( event.detail ).to.eql( {} );
                expect( event[ 'detail-type' ] ).to.exist;
                expect( event.source ).to.exist;
                expect( event.time ).to.exist;
                expect( event.id ).to.exist;
                expect( event.resources ).to.exist;
            });
        });
    });

    describe( 'record type events', function() {

        describe( '.cloudfront', function() {

            validateRecordTemplate( 'cloudfront', (event,record) => {

                expect( record.cf.config ).to.exist;
                expect( record.cf.config.distributionId ).to.exist;
                expect( record.cf.request ).to.exist;
                expect( record.cf.request.clientIp ).to.exist;
                expect( record.cf.request.method ).to.exist;
                expect( record.cf.request.uri ).to.exist;
                expect( record.cf.request.headers ).to.exist;
            });
        });

        describe( '.s3', function() {

            validateRecordTemplate( 's3', (event,record) => {

                expect( record.eventVersion ).to.exist;
                expect( record.eventTime ).to.exist;
                expect( record.requestParameters ).to.exist;
                expect( record.s3 ).to.exist;
                expect( record.responseElements ).to.exist;
                expect( record.awsRegion ).to.exist;
                expect( record.responseElements ).to.exist;
                expect( record.eventName ).to.exist;
                expect( record.userIdentity ).to.exist;
                expect( record.eventSource ).to.exist;

            });
        });

        describe( '.sns', function() {

            validateRecordTemplate( 'sns', (event, record) => {

                expect( record.EventVersion ).to.exist;
                expect( record.EventSubscriptionArn ).to.exist;
                expect( record.EventSource ).to.exist;
                expect( record.Sns ).to.exist;
            });
        });

        describe( '.sqs', function() {

            validateRecordTemplate( 'sqs', (event, record) => {

                expect( record.messageId ).to.exist;
                expect( record.receiptHandle ).to.exist;
                expect( record.body ).to.exist;
                expect( record.attributes ).to.exist;
                expect( record.messageAttributes ).to.exist;
                expect( record.md5OfBody ).to.exist;
                expect( record.eventSource ).to.exist;
                expect( record.eventSourceARN ).to.exist;
                expect( record.awsRegion ).to.exist;
            });
        });
    });
});
