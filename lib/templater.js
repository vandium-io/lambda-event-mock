'use strict';

const cloneDeep = require( 'clone-deep' );

const utils = require( 'vandium-utils' );

function parseOptionValue( value ) {

    if( value ) {

        value = value.trim();

        if( value === 'true' ) {

            value = true;
        }
        else if( value === 'false' ) {

            value = false;
        }
        else {

            let num = +value;

            if( !isNaN( num ) ) {

                value = num;
            }
        }
    }
    else {

        value = true;
    }

    return value;
}

function getOptions( optionString ) {

    let options = {};

    if( optionString.length > 0 ) {

        let optionParts = optionString.split( ',' );

        for( let optionPart of optionParts ) {

            let parts = optionPart.trim().split( '=', 2 );

            let option = parts[0].trim();

            if( option.length > 0 ) {

                options[ option ] = parseOptionValue( parts[1] );
            }
        }
    }

    return options;
}

function updateValue( value, replacements ) {

    let command = value.substring( 2, value.length - 2 );

    let commands = command.split( ':' );

    let key = commands[0];

    let expression = replacements[ key ];

    if( utils.isFunction( expression ) ) {

        value = expression( getOptions( commands[1] || '' ) );
    }
    else if( expression !== undefined ) {

        value = expression;
    }

    return value;
}

function isTemplateValue( value ) {

    return utils.isString( value ) &&
           value.startsWith( '{{' ) &&
           value.endsWith( '}}' );
}

class Templater {

    constructor( template ) {

        this.template = template;

        this.replacements = {};
    }

    transform( name, replacement ) {

        this.replacements[ name ] = replacement;

        return this;
    }

    render() {

        let obj = cloneDeep( this.template );

        this._processObject( obj );

        return obj;
    }

    _processObject( obj ) {

        for( let prop in obj ) {

            let value = obj[ prop ];

            if( isTemplateValue( value ) ) {

                obj[ prop ] = updateValue( value, this.replacements );
            }
            else {

                this._processValue( value );
            }
        }
    }

    _processArray( arr ) {

        for( let i = 0; i < arr.length; i++ ) {

            let value = arr[ i ];

            if( isTemplateValue( value ) ) {

                arr[ i ] = updateValue( value, this.replacements );
            }
            else {

                this._processValue( value );
            }
        }
    }

    _processValue( value ) {

        if( utils.isArray( value ) ) {

            this._processArray( value );
        }
        else if( utils.isObject( value ) ) {

            this._processObject( value );
        }
    }
}

module.exports = Templater;
