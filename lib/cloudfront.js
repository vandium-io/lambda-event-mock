'use strict';

const RecordEventMock = require( './record' );

const utils = require( './utils' );

class CloudfrontEventMock extends RecordEventMock {

    constructor() {

        super( 'cf', 'cloudfront' );
    }

    header( name, key, value ) {

        return this._headers( 'request', name, key, value );
    }

    _headers( objectName, name, key, value ) {

        let headers = this.objectValue[objectName].headers;

        let headersList = headers[ name ];

        if( !headersList ) {

            headersList = [];
            headers[ name ] = headersList;
        }

        headersList.push( { key, value } );

        return this;
    }
}

[
    [ 'config', 'distributionId' ],
    [ 'config', 'distributionDomainName' ],
    [ 'config', 'eventType' ],
    [ 'config', 'requestId' ],

    [ 'request', 'body' ],
    [ 'request', 'clientIp' ],
    [ 'request', 'method' ],
    [ 'request', 'uri' ],
    [ 'request', 'querystring' ],
    [ 'request', 'origin' ]
].forEach( (propertyParam) => {

    const objectName = propertyParam[0];
    const propertyName = propertyParam[1];

    CloudfrontEventMock.prototype[ utils.lowercaseFirstLetter( propertyName ) ] = function( value ) {

        if( utils.isObject( value ) ) {

            value = Object.assign( {}, value );
        }

        return this.assignObjectValue( objectName, { [`${propertyName}`]: value } );
    }
});


module.exports = CloudfrontEventMock;
