'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const cloneDeep = require( 'clone-deep' );

const Templater = require( '../templater' );

describe( 'lib/templater', function() {

    describe( 'Templater', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let template = { };

                let instance = new Templater( template );

                expect( instance.template ).to.equal( template );
                expect( instance.replacements ).to.be.empty;
            });
        });

        describe( '.transform', function() {

            it( 'normal value', function() {

                let instance = new Templater( {} );

                expect( instance.replacements ).to.be.empty;

                let returnValue = instance.transform( 'UTC', '<utc here' );

                expect( returnValue ).to.equal( instance );
            });

            it( 'function value', function() {

                let instance = new Templater( {} );

                expect( instance.replacements ).to.be.empty;

                let returnValue = instance.transform( 'UTC', (key) => '<utc-here!>' );

                expect( returnValue ).to.equal( instance );
            });
        });

        describe( '.render', function() {

            it( 'simple object', function() {

                let count = 100;

                let template = {

                    time: '{{UTC}}',
                    name: 'my name',
                    special_name: '{{SPECIAL-NAME}}',
                    longDate: '{{ISODATE:milliseconds}}',
                    stillLongDate: '{{ISODATE:milliseconds=true}}',
                    shortDate: '{{ISODATE:milliseconds=false,otherThing=true}}',
                    tick: '{{TICKER:offset=50}}',
                    happy: '{{HAPPY:yesterday = no, today=good,,,}}'
                };

                let original = cloneDeep( template );

                let result = new Templater( template )
                        .transform( 'UTC', 'Today!' )
                        .transform( 'SPECIAL-NAME', (options) => 'special name!' )
                        .transform( 'ISODATE', (options) => 'iso-' + options.milliseconds )
                        .transform( 'TICKER', (options) => { count--; return count - (options.offset || 0); } )
                        .transform( 'HAPPY', (options) => options.today )
                        .render();

                expect( result ).to.eql( {

                    time: 'Today!',
                    name: 'my name',
                    special_name: 'special name!',
                    longDate: 'iso-true',
                    stillLongDate: 'iso-true',
                    shortDate: 'iso-false',
                    tick: 49,
                    happy: 'good'
                });

                expect( template ).to.eql( original );
            });

            it( 'no transformation', function() {

                let template = {

                    time: '{{UTC}}',
                    name: 'my name'
                };

                let original = cloneDeep( template );

                let result = new Templater( template )
                        .render();

                expect( result ).to.eql( {

                    time: '{{UTC}}',
                    name: 'my name',
                });

                expect( template ).to.eql( original );
            });

            it( 'nested objects and arrays', function() {

                let template = {

                    Records: [

                        {
                            time: '{{UTC}}',
                            name: 'my name',
                            special_name: '{{SPECIAL-NAME}}',
                            ids: [ '{{COUNT}}', '{{COUNT}}', '{{COUNT}}' ],
                            other_names: [ 'other1', 'other2' ]
                        }
                    ]
                };

                let count = 1;

                let result = new Templater( template )
                        .transform( 'UTC', 'Today!' )
                        .transform( 'SPECIAL-NAME', (key) => 'special name!' )
                        .transform( 'COUNT', () => `${count++}` )
                        .render();

                expect( result ).to.eql( {

                    Records: [

                        {
                            time: 'Today!',
                            name: 'my name',
                            special_name: 'special name!',
                            ids: [ '1', '2', '3' ],
                            other_names: [ 'other1', 'other2' ]
                        }
                    ]
                });
            });
        });
    });
});
