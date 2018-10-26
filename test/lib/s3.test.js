'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const S3EventMock = require( '../../lib/s3' );

describe( 'lib/api', function() {

    describe( 'S3EventMock', function() {

        describe( '.build', function() {

            it( 'defaults', function() {

                let event = new S3EventMock().build();

                expect( eventIdentifier.identify( event ) ).to.equal( 's3' );
            });

            it( 'normal operation', function() {

                let event = new S3EventMock()
                                    .bucket( 'bucket-one' )
                                    .object( 'my-key', { size: 456} )
                                    .configurationId( '1234' )
                                    .build();

                expect( event.Records ).to.be.an( 'Array' );
                expect( event.Records.length ).to.equal( 1 );
                expect( event.Records[0].s3 ).to.exist;
                expect( event.Records[0].s3.configurationId ).to.equal( '1234' );
                expect( event.Records[0].s3.object.key ).to.equal( 'my-key');
                expect( event.Records[0].s3.object.size ).to.equal( 456 );
                expect( event.Records[0].s3.object.eTag ).to.exist;
                expect( event.Records[0].s3.object.sequencer ).to.exist;
                expect( event.Records[0].s3.bucket.name ).to.equal( 'bucket-one' );

                expect( eventIdentifier.identify( event ) ).to.equal( 's3' );
            });

            it( 'multiple records', function() {

                let event = new S3EventMock()
                                    .bucket( 'bucket-one' )
                                    .object( 'my-key', { size: 456} )
                                    .configurationId( '1234' )
                                    .next()
                                    .bucket( 'bucket-two' )
                                    .object( 'my-other-key' )
                                    .configurationId( '6789' )
                                    .eventName( 's3:ObjectRemoved:Delete' )
                                    .build();

                expect( event.Records ).to.be.an( 'Array' );
                expect( event.Records.length ).to.equal( 2 );

                expect( event.Records[0].s3 ).to.exist;
                expect( event.Records[0].s3.configurationId ).to.equal( '1234' );
                expect( event.Records[0].s3.object.key ).to.equal( 'my-key');
                expect( event.Records[0].s3.object.size ).to.equal( 456 );
                expect( event.Records[0].s3.object.eTag ).to.exist;
                expect( event.Records[0].s3.object.sequencer ).to.exist;
                expect( event.Records[0].s3.bucket.name ).to.equal( 'bucket-one' );

                expect( event.Records[1].s3 ).to.exist;
                expect( event.Records[1].s3.configurationId ).to.equal( '6789' );
                expect( event.Records[1].s3.object.key ).to.equal( 'my-other-key');
                expect( event.Records[1].s3.object.size ).to.equal( 1024 );
                expect( event.Records[1].s3.object.eTag ).to.exist;
                expect( event.Records[1].s3.object.sequencer ).to.exist;
                expect( event.Records[1].s3.bucket.name ).to.equal( 'bucket-two' );
                expect( event.Records[1].s3.eventName ).to.equal( 's3:ObjectRemoved:Delete' );
                expect( eventIdentifier.identify( event ) ).to.equal( 's3' );
            });
        });
    });
});
