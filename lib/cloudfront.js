'use strict';

const RecordEventMock = require( './record' );

class CloudfrontEventMock extends RecordEventMock {

    constructor() {

        super( 'cf', 'cloudfront' );
    }

    header( name, key, value ) {

        let headers = this.objectValue.request.headers;

        let headersList = headers[ name ];

        if( !headersList ) {

            headersList = [];
            headers[ name ] = headersList;
        }

        headersList.push( { key, value } );

        return this;
    }

    distributionId( id ) {

        return this.assignObjectValue( 'config', { distributionId: id } );
    }

    clientIp( ip ) {

        return this.assignObjectValue( 'request', { clientIp: ip } );
    }

    method( m ) {

        return this.assignObjectValue( 'request', { method: m } );
    }

    uri( u ) {

        return this.assignObjectValue( 'request', { uri: u } );
    }
}

module.exports = CloudfrontEventMock;
