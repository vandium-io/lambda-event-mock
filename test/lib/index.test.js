'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventMock = require( '../../lib/index' );

describe( 'lib/index', function() {

    [
        'apiGateway',
        'cloudformation',
        'cloudfront',
        'cloudwatch',
        'cloudwatchLogs',
        'cognito',
        'config',
        'dynamodb',
        'firehose',
        'iotButton',
        'kinesis',
        'lex',
        's3',
        'ses',
        'sns',
        'sqs'

    ].forEach( (type) => {

        describe( `.${type}`, function() {

            it( 'normal operation', function() {

                expect( eventMock[ type ] ).to.exist;

                let instance = eventMock[type]();

                instance.build();
            });
        });
    });
});
