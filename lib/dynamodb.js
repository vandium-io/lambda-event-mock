'use strict';

const RecordEventMock = require( './record' );

const significantDigits = require( '@extra-number/significant-digits' );

const constants = require( './constants' );


function calculateLength( type, value ) {

    let length = 0;

    switch( type ) {

        case 'N':
            length = significantDigits( Number( value ) );
            break;

        case 'BOOL':
            length = 1;
            break;

        case 'B':
            length = Buffer.from( value, 'base64' ).length;
            break;

        //case 'S':
        default:
            return value.toString( 'UTF-8' ).length;
    }

    return length;
}

function calculateSetLength( type, list ) {

    let length = 0;

    for( let item of list ) {

        length+= calculateLength( type, item );
    }

    return length;
}

function countCollection( collection ) {

    let totalLength = 0;

    for( let item in collection ) {

        let itemData = collection[ item ];

        let length = item.length;

        if( itemData.SS ) {

            length+= calculateSetLength( 'S', itemData.SS );
        }
        else if( itemData.NS ) {

            length+= calculateSetLength( 'N', itemData.NS );
        }
        else if( itemData.BS ) {

            length+= calculateLength( 'B', itemData.BS );
        }
        else {

            let type = Object.keys( itemData )[0];

            length+= calculateLength( type, itemData[ type ] );
        }

        totalLength+= length;
    }

    return totalLength;
}

class DynamoDBEventMock extends RecordEventMock {

    constructor() {

        super( 'dynamodb' );

        this._nextEventID = 1;
    }

    keys( keys ) {

        return this.putObjectValue( 'Keys', keys );
    }

    newImage( image ) {

        return this.putObjectValue( 'NewImage', image );
    }

    oldImage( image ) {

        return this.putObjectValue( 'OldImage', image );
    }

    eventName( name ) {

        return this.recordValue( 'eventName', name );
    }

    _updateRecord( record ) {

        let obj = record.dynamodb;

        // calculate SizeBytes
        let length = countCollection( obj.Keys );

        if( obj.NewImage ) {

            length+= countCollection( obj.NewImage );
        }

        if( obj.OldImage ) {

            length+= countCollection( obj.OldImage );
        }

        obj.SizeBytes = length;

        // set StreamViewType
        if( obj.NewImage && obj.OldImage ) {

            obj.StreamViewType = constants.NEW_AND_OLD_IMAGES;
        }
        else if( obj.NewImage ) {

            obj.StreamViewType = constants.NEW_IMAGE;
        }
        else if( obj.OldImage ) {

            obj.StreamViewType = constants.OLD_IMAGE;
        }
        else {

            obj.StreamViewType = constants.KEYS_ONLY;
        }
    }

    _createRecord() {

        let record = super._createRecord();

        record.eventID = `${this._nextEventID++}`;

        return record;
    }
}

module.exports = DynamoDBEventMock;
