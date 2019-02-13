'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const eventIdentifier = require( '@vandium/event-identifier' );

const CloudfrontEventMock = require( '../../lib/cloudfront' );

const utils = require( '../../lib/utils' );

describe( 'lib/api', function() {

    describe( 'CloudfrontEventMock', function() {

        // simplet tests
        [
            [ 'distributionId', 'MyId', 'config' ],
            [ 'distributionDomainName', 'MyDistName', 'config' ],
            [ 'eventType', 'MyEventType', 'config' ],
            [ 'requestId', 'MyRequestId', 'config' ],

            [ 'body', { data: 'whatever' }, 'request'],
            [ 'clientIp', '2.3.4.5', 'request'],
            [ 'method', '4.5.6.7', 'request' ],
            [ 'uri', 'DELETE', 'request' ],
            [ 'querystring', 'MyQueryString', 'request' ],
            [ 'origin', { whatever: 'ok' }, 'request' ]

        ].forEach( function( testParams ) {

            const method = testParams[0];
            const data = testParams[1];
            const targetObj = testParams[2];

            describe( `.${method}`, function() {

                it( 'normal operation', function() {

                    let instance = new CloudfrontEventMock();

                    let returnValue = instance[method]( data );

                    expect( returnValue ).to.equal( instance );

                    if( utils.isObject( data ) ) {

                        // value should be cloned
                        expect( instance.objectValue[targetObj][method] ).to.eql( data );
                        expect( instance.objectValue[targetObj][method] ).to.not.equal( data );
                    }
                    else {

                        expect( instance.objectValue[targetObj][method] ).to.equal( data );
                    }
                });
            });
        });

        describe( '.header', function() {

            it( 'normal operation', function() {

                let instance = new CloudfrontEventMock();

                let returnValue = instance.header( 'host', 'Host1', '1.2.3.4' );
                expect( returnValue ).to.equal( instance );

                expect( instance.objectValue.request.headers.host ).to.eql( [
                    { key: 'Host1', value: '1.2.3.4' } ]);

                instance.header( 'host', 'Host2', '1.2.3.5' );
                expect( instance.objectValue.request.headers.host ).to.eql( [
                    { key: 'Host1', value: '1.2.3.4' },
                    { key: 'Host2', value: '1.2.3.5' } ]);

                instance.header( 'other', 'other1', '<val1>' );
                expect( instance.objectValue.request.headers ).to.eql( {

                    host:[
                        { key: 'Host1', value: '1.2.3.4' },
                        { key: 'Host2', value: '1.2.3.5' }
                    ],
                    other:[
                        { key: 'other1', value: '<val1>' }
                    ]
                });
            });
        });

        describe( '.build', function() {

            it( 'default values', function() {

                let event = new CloudfrontEventMock().build();

                expect( eventIdentifier.identify( event ).type ).to.equal( 'cloudfront' );
            });

            it( 'default values', function() {

                let event = new CloudfrontEventMock()
                                    .distributionId( '1234' )
                                    .clientIp( '2000::1' )
                                    .header( 'host', 'Host','d111111abcdef8.cloudfront.net' )
                                    .header( 'host', 'Host2','d111111abcdef8.cloudfront2.net' )
                                    .header( 'user-agent', 'User-Agent', 'curl/7.51.0' )
                                    .method( 'PUT' )
                                    .uri( 'uri-here' )
                                    .build();

                expect( event.Records.length ).to.equal( 1 );
                expect( event.Records[0].cf.config.distributionId ).to.equal( '1234' );
                expect( event.Records[0].cf.request.clientIp ).to.equal( '2000::1' );
                expect( event.Records[0].cf.request.headers ).to.eql( {
                        "host": [
                          {
                            "key": "Host",
                            "value": "d111111abcdef8.cloudfront.net"
                        },
                        {
                          "key": "Host2",
                          "value": "d111111abcdef8.cloudfront2.net"
                        }
                        ],
                        "user-agent": [
                          {
                            "key": "User-Agent",
                            "value": "curl/7.51.0"
                          }
                      ]});
                expect( event.Records[0].cf.request.method ).to.equal( 'PUT' );
                expect( event.Records[0].cf.request.uri ).to.equal( 'uri-here' );
            });
        });
    });
});
