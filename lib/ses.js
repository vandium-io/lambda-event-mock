'use strict';

const RecordEventMock = require( './record' );

class SESEventMock extends RecordEventMock {

    constructor() {

        super( 'ses' );
    }

    commonHeader( name, value ) {

        this.mail.commonHeaders[ name ] = value;

        return this;
    }

    header( name, value ) {

        this.mail.headers.push( { name, value } );

        return this;
    }

    mailValue( name, value ) {

        this.mail[ name ] = value;

        return this;
    }

    receiptValue( name, value ) {

        this.receipt[ name ] = value;

        return this;
    }

    recipient( name ) {

        this.receipt.recipients.push( name );

        return this;
    }

    get mail() {

        return this.objectValue.mail;
    }

    get receipt() {

        return this.objectValue.receipt;
    }
}

module.exports = SESEventMock;
