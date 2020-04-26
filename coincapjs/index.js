const http = require('http');
const https = require('https');
const { API, CoinIDs } = require('./meta');

module.exports = (function () {
    'use strict';

    const ENDPOINT = 'api.coincap.io',
        VERSION = 'v2';

    function CoinCap() {}

    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    var ReturnKey = (n, h) => {
        for (var a in h) {
            for (var b in h[a]) {
                if ((h[a][b] + '').indexOf(n) > -1) {
                    return a;
                }
            }
        }
        return null;
    };

    var getJSON = (options, onResult) => {
        let output = '';
        const port = options.port == 443 ? https : http;
        const req = port.request(options, (res) => {
            if (options.encoding) {
                res.setEncoding(options.encoding);
            }

            res.on('data', (chunk) => {
                output += chunk;
            });

            res.on('end', () => {
                let obj;

                try {
                    obj = JSON.parse(output);
                } catch {
                    obj = output;
                }

                onResult(undefined, res.statusCode, obj);
            });
        });

        req.on('error', (err) => {
            onResult(err);
        });

        req.end();
    };

    // prettier-ignore
    CoinCap.prototype = {

        constructor: CoinCap,
        _call: function (_interface, method, parameters, cb) {

            this.URLPath = '?';

            if ((this.interface_key = ReturnKey(_interface, API.interfaces))) {
                if ((this.methods_key = ReturnKey(method, API.interfaces[ this.interface_key ].methods))) {
                    var apiMethod =
                        API.interfaces[ this.interface_key ].methods[ this.methods_key ];

                    if ( Object.size(apiMethod.parameters) < Object.size(parameters) ) {
                        return cb(
                            `CoinCapJS Error: Too many parameters for method.`,
                        );
                    }

                    if ('v' + apiMethod.version != VERSION) {
                        return cb(
                            `CoinCapJS Error: Version mismatch! Expected '${VERSION}' and got '${apiMethod.version}'`,
                        );
                    }

                    this.httpmethod = apiMethod.httpmethod;

                    var missingParams = [];
                    for (var param in apiMethod.parameters) {
                        if ( !parameters.hasOwnProperty( apiMethod.parameters[param].name ) ) {
                            if (!apiMethod.parameters[param].optional) {
                                missingParams.push( apiMethod.parameters[param].name );
                            }
                        } else {
                            if (apiMethod.parameters[param].name === 'id')
                                continue;

                            this.URLPath += `${
                                apiMethod.parameters[param].name
                            }=${parameters[apiMethod.parameters[param].name]}&`;
                        }
                    }
                    
                    if (missingParams.length > 0) {
                        return cb(
                            `CoinCapJS Error: Missing "${missingParams.join(
                                '", "',
                            )}" parameter${
                                missingParams.length > 1 ? 's' : ''
                            }! ${
                                missingParams.length > 1 ? "They're" : "It's"
                            } not optional.`,
                        );
                    }
                } else return cb(`CoinCapJS Error: Method "${method}" doesn't exist!`);
            } else return cb(`CoinCapJS Error: Interface "${_interface}" doesn't exist!`);

            this.URLPath = `/${VERSION}/${_interface}/${ method === '/' ? '' : method }${ this.URLPath === '?' ? '' : this.URLPath }`;
            
            if (this.URLPath.indexOf('{{id}}') > -1) {
                if (parameters.id) {
                    if (CoinIDs.indexOf(parameters.id) > -1) {
                        this.URLPath = this.URLPath.replace(
                            '{{id}}',
                            parameters.id,
                        );
                    } else
                        return cb(
                            `Unknown ID. Please check your spelling: "${parameters.id}"`,
                        );
                } else return cb(`ID not provided but requested.`);
            }

            getJSON(
                {
                    host: ENDPOINT,
                    port: 443,
                    path: this.URLPath,
                    method: this.httpmethod,
                    encoding: 'utf8',
                },
                (err, status, result) => {
                    result.dataLen = Object.size(result.data);
                    return cb(err, status, result);
                },
            );
        },

        getAssets: {
            collection: function (params, cb) {
                return CoinCap.prototype._call('assets', '/', params, cb);
            },

            byId: function (params, cb) {
                return CoinCap.prototype._call('assets', '{{id}}', params, cb);
            },

            history: function (params, cb) {
                return CoinCap.prototype._call(
                    'assets',
                    '{{id}}/history',
                    params,
                    cb,
                );
            },

            markets: function (params, cb) {
                return CoinCap.prototype._call(
                    'assets',
                    '{{id}}/markets',
                    params,
                    cb,
                );
            },
        },

        getRates: {
            collection: function (params, cb) {
                return CoinCap.prototype._call('rates', '/', params, cb);
            },

            byId: function (params, cb) {
                return CoinCap.prototype._call('rates', '{{id}}', params, cb);
            },
        },

        getExchanges: {
            collection: function (params, cb) {
                return CoinCap.prototype._call('exchanges', '/', params, cb);
            },

            byId: function (params, cb) {
                return CoinCap.prototype._call(
                    'exchanges',
                    '{{id}}',
                    params,
                    cb,
                );
            },
        },

        getMarkets: {
            collection: function (params, cb) {
                return CoinCap.prototype._call('markets', '/', params, cb);
            },
        },

        getCandles: {
            collection: function (params, cb) {
                return CoinCap.prototype._call('candles', '/', params, cb);
            }
        }
    };

    return CoinCap;
})();
