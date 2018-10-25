'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );

describe( 'lib/simple', function() {

    let SimpleEventMock;

    let templates;

    beforeEach( function() {

        templates  = {

            test_template: {

                render: sinon.stub().returns( { one: 1 } )
            }
        };

        SimpleEventMock = proxyquire( '../../lib/simple', {

            './templates': templates
        });
    });

    describe( 'SimpleEventMock', function() {

        describe( 'constructor', function() {

            it( 'normal operation, no helpers', function() {

                let instance = new SimpleEventMock( 'test_template' );

                expect( templates.test_template.render.calledOnce ).to.be.true;
                expect( templates.test_template.render.firstCall.args ).to.eql( [] );

                expect( instance._event ).to.eql( { one: 1 } );
            });

            it( 'normal operation, with helpers', function() {

                let instance = new SimpleEventMock( 'test_template', [ 'prop1', 'prop2' ] );

                expect( templates.test_template.render.calledOnce ).to.be.true;
                expect( templates.test_template.render.firstCall.args ).to.eql( [] );

                expect( instance._event ).to.eql( { one: 1 } );

                expect( instance.prop1 ).to.be.a( 'function' );
                expect( instance.prop2 ).to.be.a( 'function' );
            });
        });
    });
});
