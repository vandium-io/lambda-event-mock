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

    putPropertyValue( objectName, name, value, allowOverwrite = true ) {

        let obj = this.getOrCreateObject( objectName );

        if( allowOverwrite || (obj[ name ] === undefined) ) {

            obj[ name ] = value;
        }

        return this;
    }

    build() {

        return { ...this._event };
    }

    getOrCreateObject( objectName ) {

        let obj = this._event[ objectName ];

        if( !obj ) {

            obj = {};

            this._event[ objectName ] = obj;
        }

        return obj;
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

    static addPutPropertyValueObjectHelper( eventClass, name, eventPropertyMethodName, eventName = name ) {

        eventClass.prototype[ utils.lowercaseFirstLetter( name ) ] = function( values ) {

            for( let key in values ) {

                this[ eventPropertyMethodName ]( key, values[ key ] );
            }

            return this;
        }
    }

    static addPutPropertyValueHelper( eventClass, eventPropertyName, objectName ) {

        eventClass.prototype[ utils.lowercaseFirstLetter( eventPropertyName ) ] = function( name, value ) {

            return this.putPropertyValue( objectName, name, value );
        }
    }
}

module.exports = EventMock;
