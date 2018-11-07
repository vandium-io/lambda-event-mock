'use strict';

const RecordEventMock = require( './record' );

const significantDigits = require( '@extra-number/significant-digits' );

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

    size( size ) {

        return this.putObjectValue( 'SizeBytes', size );
    }

    _updateRecord( record ) {

        if( record.SizeBytes === 0 ) {

            let length = 0;

            let obj = record.dynamodb;

            if( obj.Keys ) {

                length+= countCollection( obj.Keys );
            }

            if( obj.NewImage ) {

                length+= countCollection( obj.NewImage );
            }

            if( obj.OldImage ) {

                length+= countCollection( obj.OldImage );
            }

            record.SizeBytes = length;
        }
    }

    configurationId( id ) {

        return this.putObjectValue( 'configurationId', id );
    }

    object( key, additional = {} ) {

        return this.assignObjectValue( 'object', { key }, additional );
    }

    bucket( name, additional = {} ) {

        return this.assignObjectValue( 'bucket', { name }, additional );
    }

    eventName( name ) {

        return this.putObjectValue( 'eventName', name );
    }

    _createRecord() {

        let record = super._createRecord();

        record.eventID = `${this._nextEventID++}`;
        record.SizeBytes = 0;

        return record;
    }
}

module.exports = DynamoDBEventMock;
