'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const SESEventMock = require( '../../lib/ses' );

describe( 'lib/ses', function() {

    describe( 'SESEventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new SESEventMock().build();

                expect( eventIdentifier.identify( event ) ).to.equal( 'ses' );

                expect( event.Records ).to.exist;
                expect( event.Records.length ).to.equal( 1 );

                expect( event.Records[0].eventVersion ).to.exist;
                expect( event.Records[0].ses ).to.exist;
                expect( event.Records[0].ses.mail ).to.exist;
                expect( event.Records[0].ses.receipt ).to.exist;

            });

            it( 'normal operation', function() {

                let event = new SESEventMock()
                                    .commonHeader( 'from', ['Jane Doe <janedoe@example.com>'] )
                                    .commonHeader( 'subject', 'Test Subject' )
                                    .header( 'Return-Path', '<janedoe@example.com>' )
                                    .header( 'MIME-Version', '1.0' )
                                    .mailValue( 'source', 'JaneDoe@example.com' )
                                    .recipient( 'johndoe@example.com' )
                                    .receiptValue( 'dkimVerdict', { status: 'PASS' } )
                                    .build();

                expect( eventIdentifier.identify( event ) ).to.equal( 'ses' );

                expect( event.Records.length ).to.equal( 1 );
                expect( event.Records[0].ses.mail.commonHeaders ).to.eql( {
                        from: ['Jane Doe <janedoe@example.com>'],
                        subject: 'Test Subject'
                    });
                expect( event.Records[0].ses.mail.headers ).to.eql( [
                        { name: 'Return-Path', value: '<janedoe@example.com>' },
                        { name: 'MIME-Version', value: '1.0' }
                    ]);
                expect( event.Records[0].ses.mail.source ).to.equal( 'JaneDoe@example.com' );
                expect( event.Records[0].ses.receipt.recipients ).to.eql( [ 'johndoe@example.com' ] );
                expect( event.Records[0].ses.receipt.dkimVerdict ).to.eql( { status: 'PASS' } );

//                expect( event.records[1].recordId ).to.equal( 'record2' );
            });
        });
    });
});
