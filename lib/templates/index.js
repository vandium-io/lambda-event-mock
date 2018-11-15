'use strict';

const Templater = require( '../templater' );

const utils = require( '../utils' );

function utc( options ) {

    return utils.dateToISOString( new Date(),
           utils.booleanValue( options.milliseconds, true ) );
}

function timestamp( options ) {

    let time = Date.now();

    if( options.offset ) {

        time += options.offset;
    }

    if( options.string ) {

        time = '' + time;
    }

    return time;
}

function newTemplate( json ) {

    return new Templater( json )
                        .transform( 'UTC', utc )
                        .transform( 'UUID', ()=> utils.uuid() )
                        .transform( 'TIMESTAMP', timestamp );
}

module.exports.newTemplate = newTemplate;

function templater( templateName ) {

    return newTemplate( require( `./${templateName}.json`) );
}

///////////////////////////////
// simple events
[
    'apigateway',
    'cloudformation',
    'cloudwatch',
    'cognito',
    'config',
    ['iotButton', 'iot-button'],
    'lex',
    'scheduled',

].forEach( ( type ) => {

    let name = type;
    let templateName = type;

    if( Array.isArray( type ) ) {

        name = type[0];
        templateName = type[1];
    }

    module.exports[ name ] = templater( templateName );
});

///////////////////////////////
// Record based events
[
    'cloudfront',
    'dynamodb',
    'kinesis',
    [ 'kinesis_firehose', 'kinesis-firehose' ],
    's3',
    'sns',
    'sqs'

].forEach( ( type ) => {

    let name = type;
    let templateName = type;

    if( Array.isArray( type ) ) {

        name = type[0];
        templateName = type[1];
    }

    try {

        module.exports[ name ] = templater( templateName );
    }
    catch( err ) {

        module.exports[ name ] = templater( 'event-with-records' );
    }

    module.exports[ `${name}_record` ] = templater( `${templateName}-record` );
});
