const utils = require('./utils');
const { API } = require('./meta');

const ENDPOINT = 'api.coincap.io';
const VERSION = 'v2';

// prettier-ignore
var CoinCap = {
    meta: API,
    call: function (_interface, method, parameters, cb) {

        this.URLPath = '?';

        if (!parameters) parameters = {};

        if ((this.interface_key = utils.ReturnKey(_interface, API.interfaces))) {
            if ((this.methods_key = utils.ReturnKey(method, API.interfaces[ this.interface_key ].methods))) {
                var apiMethod =
                    API.interfaces[ this.interface_key ].methods[ this.methods_key ];

                if (utils.objSize(apiMethod.parameters) < utils.objSize(parameters)) {
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
                            utils.mto(missingParams, 's')
                        }! ${
                            utils.mto(missingParams, "They're", "It's")
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
            } else return cb(`ID not provided but required.`);
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

    getAssets(op = null) {
        var cb = utils.returnProperty(op, 'cb', false);
        var params = utils.excludeProperty(op, 'cb');
        
        var prototypes = {
            byId: function (id, cb = false) {
                if (cb) {
                    return CoinCap.call(
                        'assets', 
                        '{{id}}', 
                        {id: id, ...params}, 
                        cb
                    );
                } else {
                    return {
                        history: function (cb) {
                            return CoinCap.call(
                                'assets',
                                '{{id}}/history',
                                {id: id, ...params},
                                cb,
                            );
                        },
            
                        markets: function (cb) {
                            return CoinCap.call(
                                'assets',
                                '{{id}}/markets',
                                {id: id, ...params},
                                cb,
                            );
                        },
                    };
                }
            },
        };

        if (cb) {
            return CoinCap.call('assets', '/', params, cb);
        } else {
            return { ...prototypes };
        }
    },

    getRates(op = null) {
        var cb = utils.returnProperty(op, 'cb', false);
        var params = utils.excludeProperty(op, 'cb');

        var prototypes = {
            byId: function (id, cb) {
                return CoinCap.call('rates', '{{id}}', {id: id, ...params}, cb);
            },
        };

        if (cb) {
            return CoinCap.call('rates', '/', params, cb);
        } else {
            return { ...prototypes };
        }
    },

    getExchanges(op = null) {
        var cb = utils.returnProperty(op, 'cb', false);
        var params = utils.excludeProperty(op, 'cb');

        var prototypes = {
            byId: function (id, cb) {
                return CoinCap.call(
                    'exchanges',
                    '{{id}}',
                    { id: id, ...params },
                    cb,
                );
            },
        };

        if (cb) {
            return CoinCap.call('exchanges', '/', params, cb);
        } else {
            return { ...prototypes };
        }
    },

    getMarkets(op = null) {
        var cb = utils.returnProperty(op, 'cb', false);
        var params = utils.excludeProperty(op, 'cb');

        return CoinCap.call('markets', '/', params, cb);
    },

    getCandles(op = null) {
        var cb = utils.returnProperty(op, 'cb', false);
        var params = utils.excludeProperty(op, 'cb');

        return CoinCap.call('candles', '/', params, cb);
    }
};

module.exports = CoinCap;
