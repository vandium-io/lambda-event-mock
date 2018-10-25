'use strict';

const RecordEventMock = require( './record' );

const utils = require( './utils' );

class SNSEventMock extends RecordEventMock {

    constructor() {

        super( 'Sns', 'sns' );
    }

    signature( signatureValue ) {

        return this.putObjectValue( 'Signature', signatureValue );
    }

    signingCert( url ) {

        return this.putObjectValue( 'SigningCertUrl', url );
    }

    message( msg ) {

        return this.putObjectValue( 'Message', msg );
    }

    messageId( id ) {

        return this.putObjectValue( 'MessageId', id );
    }

    messageAttribute( name, value ) {

        return this.messageAttributes( { [name]: value } );
    }

    messageAttributes( attributes ) {

        return this.assignObjectValue( 'MessageAttributes', attributes );
    }

    subject( value ) {

        return this.putObjectValue( 'Subject', value );
    }

    topic( topicArn ) {

        return this.putObjectValue( 'TopicArn', topicArn );
    }

    type( value ) {

        return this.putObjectValue( 'Type', value );
    }

    eventSubscription( eventArn ) {

        return this.recordValue( 'EventSubscriptionArn', eventArn );
    }

    _createRecord() {

        let record = super._createRecord();

        record.EventVersion = '1.0';
        record.EventSubscriptionArn = 'eventsubscriptionarn';
        record.EventSource = 'aws:sns'

        record.Sns = {

            SignatureVersion: '1',
            Timestamp: new Date().toISOString(),
            Signature: 'EXAMPLE',
            SigningCertUrl: 'SigningURLHere',
            MessageId: utils.uuid(),
            Message: 'Generated SNS message!',
            MessageAttributes: { },
            Type: "Notification",
            UnsubscribeUrl: "EXAMPLE",
            TopicArn: "topicarn",
            Subject: "TestInvoke"
        };

        return record;
    }
}

module.exports = SNSEventMock;
