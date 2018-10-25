'use strict';

const RecordEventMock = require( './record' );

const crypto = require( 'crypto' );

class SQSEventMock extends RecordEventMock {

    constructor() {

        super( 'sqs' );
    }

    messageId( id ) {

        return this.recordValue( 'messageId', id );
    }

    receiptHandle( handle ) {

        return this.recordValue( 'receiptHandle', handle );
    }

    eventSourceARN( arn ) {

        return this.recordValue( 'eventSourceARN', arn );
    }

    body( body ) {

        if( body instanceof Buffer ) {

            body = body.toString( 'base64' );
        }
        else {

            body = body.toString();
        }

        this.recordValue( 'body', body );
        this.recordValue( 'md5OfBody', crypto.createHash( 'md5' )
                                             .update( body )
                                             .digest( 'hex' ) );

        return this;
    }
}

module.exports = SQSEventMock;
