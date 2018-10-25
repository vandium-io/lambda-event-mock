'use strict';

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

    _addPutValueHelpers( helpers ) {

        for( let helper of helpers ) {

            if( Array.isArray( helper ) ) {

                this._addPutValueHelper( ...helper );
            }
            else {

                this._addPutValueHelper( helper );
            }
        }
    }

    _addPutValueHelper( name, eventName, clone ) {

        if( !eventName ) {

            eventName = name;
        }

        this[ name ] = function( value ) {

            if( clone ) {

                value = Object.assign( {}, value );
            }

            return this.putValue( eventName, value );
        }
    }

    _addPutPropertyValueHelper( eventPropertyName, objectName ) {

        this[ eventPropertyName ] = function( name, value ) {

            return this.putPropertyValue( objectName, name, value );
        }
    }
}

module.exports = EventMock;
