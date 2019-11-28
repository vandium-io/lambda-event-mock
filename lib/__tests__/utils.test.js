'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const utils = require( '../utils' );

describe( 'lib/utils', function() {

    describe( '.isEmpty', function() {

        it( 'normal operation', function() {

            expect( utils.isEmpty() ).to.be.true;
            expect( utils.isEmpty( undefined ) ).to.be.true;
            expect( utils.isEmpty( null ) ).to.be.true;
            expect( utils.isEmpty( {} ) ).to.be.true;

            expect( utils.isEmpty( { one: 1 } ) ).to.be.false;
        });
    });

    describe( '.emptyIfNull', function() {

        it( 'normal operation', function() {

            expect( utils.emptyIfNull() ).to.eql( {} );
            expect( utils.emptyIfNull( undefined ) ).to.eql( {} );
            expect( utils.emptyIfNull( null ) ).to.eql( {} );

            expect( utils.emptyIfNull( { one: 1 } ) ).to.eql( { one: 1 } );
        });
    });

    describe( '.dateToISOString', function() {

        it( 'normal operation', function() {

            let date = new Date();

            let isoString1 = utils.dateToISOString( date );
            let isoString2 = utils.dateToISOString( date, true );

            expect( isoString1.length < isoString2.length ).to.be.true;
        });
    });

    describe( '.booleanValue', function() {

        it( 'normal operation', function() {

            expect( utils.booleanValue( undefined, true ) ).to.be.true;
            expect( utils.booleanValue( null, true ) ).to.be.true;
            expect( utils.booleanValue( true, true ) ).to.be.true;
            expect( utils.booleanValue( true, false ) ).to.be.true;

            expect( utils.booleanValue( undefined ) ).to.be.false;
            expect( utils.booleanValue( undefined, false ) ).to.be.false;
            expect( utils.booleanValue( null, false ) ).to.be.false;
            expect( utils.booleanValue( false, false ) ).to.be.false;
            expect( utils.booleanValue( false, true ) ).to.be.false;
        });
    });

    describe( '.lowercaseFirstLetter', function() {

        it( 'normal operation', function() {

            expect( utils.lowercaseFirstLetter( 'MyMethod' ) ).to.equal( 'myMethod' );
            expect( utils.lowercaseFirstLetter( 'myOtherMethod' ) ).to.equal( 'myOtherMethod' );
            expect( utils.lowercaseFirstLetter( 'X' ) ).to.equal( 'x' );
        });
    });

    describe( '.uuid', function() {

        it( 'normal operation', function() {

            expect( utils.uuid ).to.exist;
        });
    });

    describe( 'inherited values', function() {

        it( 'normal operation', function() {

            let baseUtils = require( 'vandium-utils' );

            for( let key in baseUtils ) {

                expect( utils[ key ] ).to.exist;
                expect( utils[ key ] ).to.be.a( 'function' );
            }
        });
    });
});

module.exports = utils;
