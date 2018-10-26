'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const proxyquire = require( 'proxyquire' ).noCallThru();

const sinon = require( 'sinon' );

describe( 'lib/record', function() {

    let RecordEventMock;

    let templates;

    beforeEach( function() {

        templates  = {

            myService: {

                render: sinon.stub().returns( { Records: [] } )
            },

            myService_record: {

                render: sinon.stub().returns( { one: 1, myService: {} } )
            }
        };

        RecordEventMock = proxyquire( '../../lib/record', {

            './templates': templates
        });
    });

    describe( 'RecordEventMock', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let instance = new RecordEventMock( 'myService' );

                expect( templates.myService.render.calledOnce ).to.be.true;
                expect( templates.myService.render.firstCall.args ).to.eql( [] );

                expect( templates.myService_record.render.calledOnce ).to.be.true;
                expect( templates.myService_record.render.firstCall.args ).to.eql( [] );

                expect( instance._event ).to.eql( { Records: [ { one: 1, myService: {} } ] } );
            });

            it( 'different template name than service name', function() {

                let instance = new RecordEventMock( 'myService', 'myService' );

                expect( templates.myService.render.calledOnce ).to.be.true;
                expect( templates.myService.render.firstCall.args ).to.eql( [] );

                expect( templates.myService_record.render.calledOnce ).to.be.true;
                expect( templates.myService_record.render.firstCall.args ).to.eql( [] );

                expect( instance._event ).to.eql( { Records: [ { one: 1, myService: {} } ] } );
            });
        });

        describe( '.next', function() {

            it( 'normal operation', function() {

                let instance = new RecordEventMock( 'myService' );

                expect( instance._event ).to.eql( { Records: [ { one: 1, myService: {} } ] } );

                // will add another record
                let returnValue = instance.next();
                expect( returnValue ).to.equal( instance );

                expect( instance._event ).to.eql( { Records: [ { one: 1, myService: {} }, { one: 1, myService: {} } ] } );
            });
        });

        describe( '.currentRecord', function() {

            it( 'normal operation', function() {

                let instance = new RecordEventMock( 'myService' );

                expect( instance.currentRecord ).to.equal( instance._event.Records[0] );

                instance.next();
                expect( instance.currentRecord ).to.equal( instance._event.Records[1] );
            });
        });

        describe( '.recordValue', function() {

            it( 'normal operation', function() {

                let instance = new RecordEventMock( 'myService' );

                let returnValue = instance.recordValue( 'id', '1234' );

                expect( returnValue ).to.equal( instance );
                expect( instance.currentRecord.id ).to.equal( '1234' );

                instance.next();
                instance.recordValue( 'id', '2345' );
                expect( instance.currentRecord.id ).to.equal( '2345' );
            });
        });

        describe( '.objectValue', function() {

            it( 'normal operation', function() {

                let instance = new RecordEventMock( 'myService' );

                expect( instance.objectValue ).to.eql( {} );
            });
        });

        describe( '.putObjectValue', function() {

            it( 'normal operation', function() {

                let instance = new RecordEventMock( 'myService' );

                let returnValue = instance.putObjectValue( 'something', 1234 );
                expect( returnValue ).to.equal( instance );
                expect( instance.objectValue ).to.eql( { something: 1234 } );
            });
        });

        describe( '.assignObjectValue', function() {

            it( 'normal operation', function() {

                let instance = new RecordEventMock( 'myService' );

                let returnValue = instance.assignObjectValue( 'something', { id: 1234 } );
                expect( returnValue ).to.equal( instance );
                expect( instance.objectValue ).to.eql( { something: { id: 1234 } } );

                instance.assignObjectValue( 'something', { name: 'fred' } );
                expect( instance.objectValue ).to.eql( { something: { id: 1234, name: 'fred' } } );
            });
        });
    });
});
