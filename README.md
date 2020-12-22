# coincapjs

### Light weight, easy to use CoinCap api wrapper for NodeJS

[![NPM](https://nodei.co/npm/coincapjs.png)](https://nodei.co/npm/coincapjs/)

## Basic Usage

```js
// npm install coincapjs --save
const CoinCap = require('coincapjs');

CoinCap.getAssets({
    cb: function (err, status, result) {
        if (err) throw err;

        console.log(`Data Length: ${result.dataLen}`);
        console.log(`First Result: ${JSON.parse(result.data[0])}`);
    },
});
```

# Interfaces

-   [`CoinCap.getAssets({ ...params?, function: cb? })`](https://docs.coincap.io/?version=latest#ee0c0be6-513f-4466-bbb0-2016add462e9)
-   [`CoinCap.getRates({ ...params?, function: cb? })`](https://docs.coincap.io/?version=latest#d4bac290-230a-48c6-a8eb-6804b2d137f3)
-   [`CoinCap.getExchanges({ ...params?, function: cb? })`](https://docs.coincap.io/?version=latest#aff336c8-9d06-4654-bc15-a56cef06a69e)
-   [`CoinCap.getMarkets({ ...params?, function: cb })`](https://docs.coincap.io/?version=latest#a549b4e3-544a-407e-aacd-8b44630c505a)
-   [`CoinCap.getCandles({ ...params?, function: cb })`](https://docs.coincap.io/?version=latest#ab6ce4ff-3669-4b60-88bb-a5e7c12e6881)

# Methods

### Interface `CoinCap.getAssets`

-   [`CoinCap.getAssets({ ...params?, function: cb? })`](https://docs.coincap.io/?version=latest#89deffa0-ab03-4e0a-8d92-637a857d2c91)
    -   [`byId(String: id, function: cb?)`](https://docs.coincap.io/?version=latest#f8869879-171f-4240-adfd-dd2947506adc)
        -   [`history(function: cb)`](https://docs.coincap.io/?version=latest#61e708a8-8876-4fb2-a418-86f12f308978)
        -   [`markets(function: cb)`](https://docs.coincap.io/?version=latest#7f727b78-5013-41ec-aa1c-351b836458d0)

### Interface `CoinCap.getRates`

-   [`CoinCap.getRates({ ...params?, function: cb? })`](https://docs.coincap.io/?version=latest#2a87f3d4-f61f-42d3-97e0-3a9afa41c73b)
    -   [`byId(String: id, function: cb)`](https://docs.coincap.io/?version=latest#0a8102a5-c338-4661-aa99-f1c57661b5b1)

### Interface `CoinCap.getExchanges`

-   [`CoinCap.getExchanges({ ...params?, function: cb? })`](https://docs.coincap.io/?version=latest#e1c56fd0-d57a-40dd-8a24-4b0883b58cfb)
    -   [`byId(String: id, function: cb)`](https://docs.coincap.io/?version=latest#217e6d7e-feb8-4b9f-81d5-c53cda839579)

### Interface `CoinCap.getMarkets`

-   [`CoinCap.getMarkets({ ...params?, function: cb })`](https://docs.coincap.io/?version=latest#d8fd6001-e127-448d-aadd-bfbfe2c89dbe)

### Interface `CoinCap.getCandles`

-   [`CoinCap.getCandles({ ...params?, function: cb })`](https://docs.coincap.io/?version=latest#51da64d7-b83b-4fac-824f-3f06b6c8d944)

---

# Changes

### `1.0.3` >> `1.0.5`

-   Changed around prototypes to match hierarchy.
-   Deprecated `collection(Object: params, function: cb)`
    -   Interfaces now do the same job as `collection` did.

```js
// OLD
CoinCap.getAssets.collection({}, function (err, status, result) {});
// CURRENT
CoinCap.getAssets({ cb: function (err, status, result) {} });
```

---

# Examples

### TL;DR `CoinCap.call`

```js
// Call assets directly
CoinCap.call('assets', '{{id}}', { id: 'bitcoin' }, (err, status, res) => {
    if (err) throw err;

    console.log(
        `CoinCap.call('assets', '{{id}}', { id: 'bitcoin' })[ ${status} ]: ${res.dataLen}`,
    );
});
```

### Interface `CoinCap.getAssets`

```js
// Get asset collection
CoinCap.getAssets({
    cb: function (err, status, res) {
        if (err) {
            throw err;
        }

        console.log(
            `CoinCap.getAssets()[${status}]: ${res.dataLen}\n${res.data[0]}`,
        );
    },
});
// Get asset by id "bitcoin"
CoinCap.getAssets().byId('bitcoin', function (err, status, res) {
    if (err) {
        throw err;
    }

    console.log(
        `CoinCap.getAssets().byId('bitcoin')[${status}]: ${res.dataLen}\n${res.data[0]}`,
    );
});

// interval: m1, m5, m15, m30, h1, h2, h6, h12, d1
CoinCap.getAssets({ interval: 'd1' })
    .byId('bitcoin')
    .history(function (err, status, res) {
        if (err) {
            throw err;
        }

        console.log(
            `CoinCap.getAssets({ interval: 'd1' }).byId('bitcoin')[${status}]: ${res.dataLen}\n${res.data[0]}`,
        );
    });

CoinCap.getAssets()
    .byId('bitcoin')
    .markets(function (err, status, res) {
        if (err) {
            throw err;
        }

        console.log(
            `CoinCap.getAssets().byId('bitcoin').markets[${status}]:`,
            res.dataLen,
        );
    });
```

### Interface `CoinCap.getRates`

```js
CoinCap.getRates({
    cb: function (err, status, res) {
        if (err) {
            throw err;
        }

        console.log(`CoinCap.getRates[${status}]:`, res.dataLen);
    },
});

CoinCap.getRates().byId('bitcoin', function (err, status, res) {
    if (err) {
        throw err;
    }

    console.log(`CoinCap.getRates().byId('bitcoin')[${status}]:`, res.dataLen);
});
```

### Interface `CoinCap.getExchanges`

```js
CoinCap.getExchanges().byId('bitcoin', function (err, status, res) {
    if (err) {
        throw err;
    }

    console.log(
        `CoinCap.getExchanges().byId('bitcoin')[${status}]:`,
        res.dataLen,
    );
});
```

### Interface `CoinCap.getMarkets`

```js
CoinCap.getMarkets({
    exchangeId: 'quoine',
    cb: function (err, status, res) {
        if (err) {
            throw err;
        }

        console.log(
            `CoinCap.getMarkets({ exchangeId: 'quoine' })[${status}]:`,
            res.dataLen,
        );
    },
});
```

### Interface `CoinCap.getCandles`

```js
CoinCap.getCandles({
    exchange: 'poloniex',
    interval: 'm1',
    baseId: 'ethereum',
    quoteId: 'bitcoin',
    cb: function (err, status, res) {
        if (err) {
            throw err;
        }

        console.log(
            `CoinCap.getCandles({ exchange: 'poloniex', interval: 'm1', baseId: 'ethereum', quoteId: 'bitcoin' })[${status}]:`,
            res.dataLen,
        );
    },
});
```

---

# Links

[CoinCap.io](https://coincap.io/)

[CoinCap.io API Docs](https://docs.coincap.io/)
