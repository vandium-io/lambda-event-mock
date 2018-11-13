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
    'scheduled',

].forEach( ( type ) => {

    module.exports[ type ] = templater( type );
});

///////////////////////////////
// Record based events
[
    'cloudfront',
    'dynamodb',
    's3',
    'sns',
    'sqs'

].forEach( ( type ) => {

    try {

        module.exports[ type ] = templater( type );
    }
    catch( err ) {

        module.exports[ type ] = templater( 'event-with-records' );
    }

    module.exports[ `${type}_record` ] = templater( `${type}-record` );
});
