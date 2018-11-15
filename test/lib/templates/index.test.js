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

        describe( '.cloudwatch', function() {

            validateTemplate( 'cloudwatch', (event) => {

                expect( event.awslogs ).to.exist;
                expect( event.awslogs.data ).to.exist;
            });
        });

        describe( '.cognito', function() {

            validateTemplate( 'cognito', (event) => {

                expect( event.datasetName ).to.exist;
                expect( event.eventType).to.exist;
                expect( event.region ).to.exist;
                expect( event.identityId ).to.exist;
                expect( event.datasetRecords ).to.exist;
                expect( event.identityPoolId).to.exist;
                expect( event.version ).to.exist;
            });
        });

        describe( '.config', function() {

            validateTemplate( 'config', (event) => {

                expect( event.invokingEvent ).to.exist;
                expect( event.ruleParameters).to.exist;
                expect( event.resultToken ).to.exist;
                expect( event.eventLeftScope ).to.exist;
                expect( event.executionRoleArn ).to.exist;
                expect( event.configRuleArn).to.exist;
                expect( event.configRuleName ).to.exist;
                expect( event.configRuleId ).to.exist;
                expect( event.accountId ).to.exist;
                expect( event.version ).to.exist;
            });
        });

        describe( '.iotButton', function() {

            validateTemplate( 'iotButton', (event) => {

                expect( event.serialNumber ).to.exist;
                expect( event.clickType).to.exist;
                expect( event.batteryVoltage ).to.exist;
            }, 'iot-button' );
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

        describe( '.dynamodb', function() {

            validateRecordTemplate( 'dynamodb', (event,record) => {

                expect( record.eventID ).to.exist;
                expect( record.eventVersion ).to.exist;

                expect( record.dynamodb ).to.exist;
                expect( record.dynamodb.Keys ).to.exist;
                expect( record.dynamodb.StreamViewType ).to.exist;
                expect( record.dynamodb.SequenceNumber ).to.exist;
                expect( record.dynamodb.SizeBytes ).to.exist;

                expect( record.awsRegion ).to.exist;
                expect( record.eventName ).to.exist;
                expect( record.eventSourceARN ).to.exist;
                expect( record.eventSource ).to.exist;
            });
        });

        describe( '.kinesis', function() {

            validateRecordTemplate( 'kinesis', (event,record) => {

                expect( record.eventID ).to.exist;
                expect( record.eventVersion ).to.exist;
                expect( record.invokeIdentityArn ).to.exist;
                expect( record.eventName ).to.exist;
                expect( record.eventSource ).to.exist;
                expect( record.awsRegion ).to.exist;

                expect( record.kinesis ).to.exist;
                expect( record.kinesis.partitionKey ).to.exist;
                expect( record.kinesis.data ).to.exist;
                expect( record.kinesis.kinesisSchemaVersion ).to.exist;
                expect( record.kinesis.sequenceNumber ).to.exist;
            });
        });

        describe( '.kinesis_firehose', function() {

            validateRecordTemplate( 'kinesis_firehose', (event,record) => {

                expect( event.invocationId ).to.exist;
                expect( event.deliveryStreamArn ).to.exist;
                expect( event.region ).to.exist;
                expect( event.records ).to.exist;

                expect( record.data ).to.exist;
                expect( record.recordId ).to.exist;
                expect( record.approximateArrivalTimestamp ).to.exist;

                expect( record.kinesisRecordMetadata ).to.exist;
                expect( record.kinesisRecordMetadata.shardId ).to.exist;
                expect( record.kinesisRecordMetadata.partitionKey ).to.exist;
                expect( record.kinesisRecordMetadata.approximateArrivalTimestamp ).to.exist;
                expect( record.kinesisRecordMetadata.sequenceNumber ).to.exist;
                expect( record.kinesisRecordMetadata.subsequenceNumber ).to.exist;
            }, 'kinesis-firehose' );
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
