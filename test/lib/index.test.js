'use strict';

/*jshint expr: true*/

//const expect = require( 'chai' ).expect;

const eventMock = require( '../../lib/index' );

describe( 'lib/index', function() {

    [
        'api',
        's3',
        'scheduled',
        'sns',
        'sqs'

    ].forEach( (type) => {

        describe( `.${type}`, function() {

            it( 'normal operation', function() {

                let instance = eventMock[type]();

                instance.build();
            });
        });
    });
});
