'use strict';

const uuid = require( 'uuid' );

const utils = Object.assign( {}, require( 'vandium-utils' ) );

utils.isEmpty = function( obj ) {

    if( !obj ) {

        return true;
    }

    return (Object.keys( obj ).length === 0 );
}

utils.emptyIfNull = function( value ) {

    if( value === null || value === undefined ) {

        value = {};
    }

    return value;
}

utils.dateToISOString = function( date, milliseconds = false ) {

    let str = date.toISOString();

    if( !milliseconds ) {

        str = str.split('.')[0]+"Z";
    }

    return str;
}

utils.booleanValue = function( value, defaultValue = false ) {

    if( value === undefined ) {

        value = defaultValue;
    }

    return value;
}

utils.uuid = uuid.v4;

module.exports = utils;
