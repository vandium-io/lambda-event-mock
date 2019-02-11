'use strict';

const uuid = require( 'uuid' );

const utils = Object.assign( {}, require( 'vandium-utils' ) );

function isNullOrUndefined( value ) {

    return (value === null) || (value === undefined);
}

utils.isEmpty = function( obj ) {

    if( isNullOrUndefined( obj ) ) {

        return true;
    }

    return (Object.keys( obj ).length === 0 );
}

utils.emptyIfNull = function( obj ) {

    if( isNullOrUndefined( obj ) ) {

        obj = {};
    }

    return obj;
}

utils.dateToISOString = function( date, milliseconds = false ) {

    let str = date.toISOString();

    if( !milliseconds ) {

        str = str.split('.')[0]+"Z";
    }

    return str;
}

utils.booleanValue = function( value, defaultValue = false ) {

    if( isNullOrUndefined( value ) ) {

        value = defaultValue;
    }

    return value;
}

utils.lowercaseFirstLetter = function( str ) {

    return str.charAt( 0 ).toLowerCase() + str.slice( 1 );
}

utils.uuid = uuid.v4;

module.exports = utils;
