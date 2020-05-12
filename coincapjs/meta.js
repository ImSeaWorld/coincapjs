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
                            type: String,
                            optional: true,
                            description:
                                'search by asset id (bitcoin) or symbol (BTC)',
                        },
                        {
                            name: 'ids',
                            type: String,
                            optional: true,
                            description:
                                'query with multiple ids=bitcoin,ethereum,monero',
                        },
                        {
                            name: 'limit',
                            type: Number,
                            optional: true,
                            description: 'max limit of 2000',
                        },
                        {
                            name: 'offset',
                            type: Number,
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
                            type: String,
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
                            type: String,
                            optional: false,
                            description: 'asset id',
                        },
                        {
                            name: 'interval',
                            type: String,
                            optional: false,
                            description:
                                'point-in-time interval. minute and hour intervals represent price at that time, the day interval represents average of 24 hour periods (timezone: UTC)',
                        },
                        {
                            name: 'start',
                            type: String,
                            optional: true,
                            description:
                                'UNIX time in milliseconds. omiting will return the most recent asset history. If start is supplied, end is required and vice vera',
                        },
                        {
                            name: 'end',
                            type: String,
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
                            type: String,
                            optional: false,
                            description: 'asset id',
                        },
                        {
                            name: 'limit',
                            type: Number,
                            optional: true,
                            description: 'max limit of 2000',
                        },
                        {
                            name: 'offset',
                            type: Number,
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
                            type: String,
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
                            type: String,
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
                            type: String,
                            optional: true,
                            description: 'search by exchange id',
                        },
                        {
                            name: 'baseSymbol',
                            type: String,
                            optional: true,
                            description:
                                'returns all containing the base symbol',
                        },
                        {
                            name: 'quoteSymbol',
                            type: String,
                            optional: true,
                            description:
                                'returns all containing the quote symbol',
                        },
                        {
                            name: 'baseId',
                            type: String,
                            optional: true,
                            description: 'returns all containing the base id',
                        },
                        {
                            name: 'quoteId',
                            type: String,
                            optional: true,
                            description: 'returns all containing the quote id',
                        },
                        {
                            name: 'assetSymbol',
                            type: String,
                            optional: true,
                            description:
                                'returns all assets containing symbol (base and quote)',
                        },
                        {
                            name: 'assetId',
                            type: String,
                            optional: true,
                            description:
                                'returns all assets containing id (base and quote)',
                        },
                        {
                            name: 'limit',
                            type: Number,
                            optional: true,
                            description: 'max limit of 2000',
                        },
                        {
                            name: 'offset',
                            type: Number,
                            optional: true,
                            description: 'offset',
                        },
                    ],
                },
            ],
        },
        {
            name: 'candles',
            methods: [
                {
                    name: '/',
                    version: 2,
                    httpmethod: 'GET',
                    parameters: [
                        {
                            name: 'exchange',
                            type: String,
                            optional: false,
                            description: 'exchange id',
                        },
                        {
                            name: 'interval',
                            type: String,
                            optional: false,
                            description: 'candle interval',
                        },
                        {
                            name: 'baseId',
                            type: String,
                            optional: false,
                            description: 'base id',
                        },
                        {
                            name: 'quoteId',
                            type: String,
                            optional: false,
                            description: 'quote id',
                        },
                        {
                            name: 'start',
                            type: Number,
                            optional: true,
                            description:
                                'UNIX time in milliseconds. omiting will return the most recent candles',
                        },
                        {
                            name: 'end',
                            type: Number,
                            optional: true,
                            description:
                                'UNIX time in milliseconds. omiting will return the most recent candles',
                        },
                    ],
                },
            ],
        },
    ],
};
