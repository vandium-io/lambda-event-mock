'use strict';

const utils = require( './utils' );

class EventMock {

    constructor( template ) {

        this._event = template.render();
    }

    putValue( name, value ) {

        this._event[ name ] = value;

        return this;
    }

    putPropertyValue( objectName, name, value ) {

        let obj = this._event[ objectName ];

        if( !obj ) {

            obj = {};

            this._event[ objectName ] = obj;
        }

        obj[ name ] = value;

        return this;
    }

    build() {

        return Object.assign( {}, this._event );
    }

    static addPutValueHelpers( eventClass, helpers ) {

        for( let helper of helpers ) {

            if( Array.isArray( helper ) ) {

                EventMock.addPutValueHelper( eventClass, ...helper );
            }
            else {

                EventMock.addPutValueHelper( eventClass, helper );
            }
        }
    }

    static addPutValueHelper( eventClass, name, eventName, clone ) {

        if( !eventName ) {

            eventName = name;
        }

        eventClass.prototype[ utils.lowercaseFirstLetter( name ) ] = function( value ) {

            if( clone ) {

                value = Object.assign( {}, value );
            }

            return this.putValue( eventName, value );
        }
    }

    static addPutPropertyValueHelper( eventClass, eventPropertyName, objectName ) {

        eventClass.prototype[ utils.lowercaseFirstLetter( eventPropertyName ) ] = function( name, value ) {

            return this.putPropertyValue( objectName, name, value );
        }
    }
}

module.exports = EventMock;
