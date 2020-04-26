// pull this from assets call.
//var Arr = []; data.data.forEach((item) => { Arr.push(item.id); });
exports.CoinIDs = [
    'bitcoin',
    'ethereum',
    'ripple',
    'bitcoin-cash',
    'tether',
    'litecoin',
    'binance-coin',
    'eos',
    'bitcoin-sv',
    'stellar',
    'tron',
    'monero',
    'cardano',
    'unus-sed-leo',
    'huobi-token',
    'chainlink',
    'cosmos',
    'neo',
    'iota',
    'dash',
    'tezos',
    'ethereum-classic',
    'maker',
    'ontology',
    'usd-coin',
    'nem',
    'dogecoin',
    'basic-attention-token',
    'zcash',
    'paxos-standard-token',
    'vechain',
    'decred',
    'qtum',
    'trueusd',
    '0x',
    'ravencoin',
    'holo',
    'bitcoin-gold',
    'abbc-coin',
    'omisego',
    'bytom',
    'augur',
    'nano',
    'algorand',
    'bitcoin-diamond',
    'lisk',
    'dai',
    'digibyte',
    'siacoin',
    'hypercash',
    'icon',
    'iostoken',
    'waves',
    'bitshares',
    'monacoin',
    'komodo',
    'crypto-com',
    'theta-token',
    'aeternity',
    'verge',
    'maidsafecoin',
    'ardor',
    'rlc',
    'steem',
    'zilliqa',
    'nexo',
    'enjin-coin',
    'seele',
    'aelf',
    'status',
    'crypterium',
    'golem-network-tokens',
    'zcoin',
    'zencash',
    'metaverse',
    'gxchain',
    'dxchain-token',
    'decentraland',
    'stratis',
    'waltonchain',
    'elastos',
    'nebulas-token',
    'tomochain',
    'nuls',
    'project-pai',
    'loopring',
    'kyber-network',
    'aion',
    'civic',
    'tierion',
    'ignis',
    'populous',
    'truechain',
    'grin',
    'digixdao',
    'ark',
    'aragon',
    'wanchain',
    'nexus',
    'loom-network',
];

// really would like this as a json response
// but need to scrape it from the docs ( .-.)
exports.API = {
    interfaces: [
        {
            name: 'assets',
            methods: [
                {
                    name: '/',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [
                        {
                            name: 'search',
                            type: 'string',
                            optional: true,
                            description:
                                'search by asset id (bitcoin) or symbol (BTC)',
                        },
                        {
                            name: 'ids',
                            type: 'string', // bitcoin?
                            optional: true,
                            description:
                                'query with multiple ids=bitcoin,ethereum,monero',
                        },
                        {
                            name: 'limit',
                            type: 'int',
                            optional: true,
                            description: 'max limit of 2000',
                        },
                        {
                            name: 'offset',
                            type: 'int',
                            optional: true,
                            description: 'offset',
                        },
                    ],
                },
                {
                    name: '{{id}}',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [
                        {
                            name: 'id',
                            type: 'string',
                            optional: false,
                            description: 'asset id',
                        },
                    ],
                },
                {
                    name: '{{id}}/history',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [
                        {
                            name: 'id',
                            type: 'string',
                            optional: false,
                            description: 'asset id',
                        },
                        {
                            name: 'interval',
                            type: 'string',
                            optional: false,
                            description:
                                'point-in-time interval. minute and hour intervals represent price at that time, the day interval represents average of 24 hour periods (timezone: UTC)',
                        },
                        {
                            name: 'start',
                            type: 'string', // date in unix timestamp
                            optional: true,
                            description:
                                'UNIX time in milliseconds. omiting will return the most recent asset history. If start is supplied, end is required and vice vera',
                        },
                        {
                            name: 'end',
                            type: 'string',
                            optional: true,
                            description:
                                'UNIX time in milliseconds. omiting will return the most recent asset history. If start is supplied, end is required and vice vera',
                        },
                    ],
                },
                {
                    name: '{{id}}/markets',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [
                        {
                            name: 'id',
                            type: 'string',
                            optional: false,
                            description: 'asset id',
                        },
                        {
                            name: 'limit',
                            type: 'int',
                            optional: true,
                            description: 'max limit of 2000',
                        },
                        {
                            name: 'offset',
                            type: 'int',
                            optional: true,
                            description: 'offset',
                        },
                    ],
                },
            ],
        },
        {
            name: 'rates',
            methods: [
                {
                    name: '/',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [],
                },
                {
                    name: '{{id}}',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [
                        {
                            name: 'id',
                            type: 'string',
                            optional: false,
                            description: 'asset id',
                        },
                    ],
                },
            ],
        },
        {
            name: 'exchanges',
            methods: [
                {
                    name: '/',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [],
                },
                {
                    name: '{{id}}',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [
                        {
                            name: 'id',
                            type: 'string',
                            optional: false,
                            description: 'asset id',
                        },
                    ],
                },
            ],
        },
        {
            name: 'markets',
            methods: [
                {
                    name: '/',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [
                        {
                            name: 'exchangeId',
                            type: 'string',
                            optional: true,
                            description: 'search by exchange id',
                        },
                        {
                            name: 'baseSymbol',
                            type: 'string',
                            optional: true,
                            description:
                                'returns all containing the base symbol',
                        },
                        {
                            name: 'quoteSymbol',
                            type: 'string',
                            optional: true,
                            description:
                                'returns all containing the quote symbol',
                        },
                        {
                            name: 'baseId',
                            type: 'string',
                            optional: true,
                            description: 'returns all containing the base id',
                        },
                        {
                            name: 'quoteId',
                            type: 'string',
                            optional: true,
                            description: 'returns all containing the quote id',
                        },
                        {
                            name: 'assetSymbol',
                            type: 'string',
                            optional: true,
                            description:
                                'returns all assets containing symbol (base and quote)',
                        },
                        {
                            name: 'assetId',
                            type: 'string',
                            optional: true,
                            description:
                                'returns all assets containing id (base and quote)',
                        },
                        {
                            name: 'limit',
                            type: 'int',
                            optional: true,
                            description: 'max limit of 2000',
                        },
                        {
                            name: 'offset',
                            type: 'int',
                            optional: true,
                            description: 'offset',
                        },
                    ],
                },
            ],
        },
    ],
};
