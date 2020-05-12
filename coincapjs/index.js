const utils = require('./utils');
const API = require('./meta');

const ENDPOINT = 'api.coincap.io';
const VERSION = 'v2';

// prettier-ignore
var CoinCap = {
    _call: function (_interface, method, parameters, cb) {

        this.URLPath = '?';

        if ((this.interface_key = utils.ReturnKey(_interface, API.interfaces))) {
            if ((this.methods_key = utils.ReturnKey(method, API.interfaces[ this.interface_key ].methods))) {
                var apiMethod =
                    API.interfaces[ this.interface_key ].methods[ this.methods_key ];

                if ( utils.objSize(apiMethod.parameters) < utils.objSize(parameters) ) {
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
                this.URLPath = this.URLPath.replace(
                    '{{id}}',
                    parameters.id,
                );
            } else return cb(`ID not provided but requested.`);
        }

        utils.getJSON(
            {
                host: ENDPOINT,
                port: 443,
                path: this.URLPath,
                method: this.httpmethod,
                encoding: 'utf8',
            },
            (err, status, result) => {
                result.dataLen = utils.objSize(result.data);
                return cb(err, status, result);
            },
        );
    },

    getAssets: {
        collection: function (params, cb) {
            return CoinCap._call('assets', '/', params, cb);
        },

        byId: function (params, cb) {
            return CoinCap._call('assets', '{{id}}', params, cb);
        },

        history: function (params, cb) {
            return CoinCap._call(
                'assets',
                '{{id}}/history',
                params,
                cb,
            );
        },

        markets: function (params, cb) {
            return CoinCap._call(
                'assets',
                '{{id}}/markets',
                params,
                cb,
            );
        },
    },

    getRates: {
        collection: function (params, cb) {
            return CoinCap._call('rates', '/', params, cb);
        },

        byId: function (params, cb) {
            return CoinCap._call('rates', '{{id}}', params, cb);
        },
    },

    getExchanges: {
        collection: function (params, cb) {
            return CoinCap._call('exchanges', '/', params, cb);
        },

        byId: function (params, cb) {
            return CoinCap._call(
                'exchanges',
                '{{id}}',
                params,
                cb,
            );
        },
    },

    getMarkets: {
        collection: function (params, cb) {
            return CoinCap._call('markets', '/', params, cb);
        },
    },

    getCandles: {
        collection: function (params, cb) {
            return CoinCap._call('candles', '/', params, cb);
        }
    }
};

module.exports = CoinCap;
