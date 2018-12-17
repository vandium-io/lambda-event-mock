'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventMock = require( '../../lib/index' );

describe( 'lib/index', function() {

    [
        'apiGateway',
        'cloudformation',
        'cloudwatch',
        'cognito',
        'config',
        'dynamodb',
        'firehose',
        'iotButton',
        'kinesis',
        'lex',
        's3',
        'ses',
        'scheduled',
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
