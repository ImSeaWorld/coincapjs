# coincapjs

### Light weight, easy to use CoinCap api wrapper for NodeJS

[![NPM](https://nodei.co/npm/coincapjs.png)](https://nodei.co/npm/coincapjs/)

## Usage

```js
const CoinCap = require('coincapjs');

CoinCap.getAssets.collection({}, function (err, status, result) {
    if (err) throw err;

    console.log(`Data Length: ${result.dataLen}`);
    console.log(`First Result: ${JSON.parse(result.data[0])}`);
});

// Detect missing parameters before call is made.
// This will only care about required parameters specified
CoinCap.getAssets.byId({}, function (err, status, result) {
    if (err) throw err;
    // Throws Error: "CoinCapJS Error: Missing "id" parameter! It's not optional."
});
```

# Interfaces

-   [`CoinCap.getAssets`](https://docs.coincap.io/?version=latest#ee0c0be6-513f-4466-bbb0-2016add462e9)
-   [`CoinCap.getRates`](https://docs.coincap.io/?version=latest#d4bac290-230a-48c6-a8eb-6804b2d137f3)
-   [`CoinCap.getExchanges`](https://docs.coincap.io/?version=latest#aff336c8-9d06-4654-bc15-a56cef06a69e)
-   [`CoinCap.getMarkets`](https://docs.coincap.io/?version=latest#a549b4e3-544a-407e-aacd-8b44630c505a)
-   [`CoinCap.getCandles`](https://docs.coincap.io/?version=latest#ab6ce4ff-3669-4b60-88bb-a5e7c12e6881)

# Methods

### Interface `CoinCap.getAssets`

-   [`collection(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#89deffa0-ab03-4e0a-8d92-637a857d2c91)
-   [`byId(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#f8869879-171f-4240-adfd-dd2947506adc)
-   [`history(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#61e708a8-8876-4fb2-a418-86f12f308978)
-   [`markets(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#7f727b78-5013-41ec-aa1c-351b836458d0)

### Interface `CoinCap.getRates`

-   [`collection(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#2a87f3d4-f61f-42d3-97e0-3a9afa41c73b)
-   [`byId(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#0a8102a5-c338-4661-aa99-f1c57661b5b1)

### Interface `CoinCap.getExchanges`

-   [`collection(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#e1c56fd0-d57a-40dd-8a24-4b0883b58cfb)
-   [`byId(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#217e6d7e-feb8-4b9f-81d5-c53cda839579)

### Interface `CoinCap.getMarkets`

-   [`collection(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#d8fd6001-e127-448d-aadd-bfbfe2c89dbe)

### Interface `CoinCap.getCandles`

-   [`collection(Object: params, function: cb)`](https://docs.coincap.io/?version=latest#51da64d7-b83b-4fac-824f-3f06b6c8d944)

---

# Links

[CoinCap.io](https://coincap.io/)

[CoinCap.io API Docs](https://docs.coincap.io/)
