var CoinCap = require('../coincapjs');

var CoinCapAPI = new CoinCap();

CoinCapAPI.getAssets.collection({}, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res.dataLen);
});

CoinCapAPI.getAssets.byId({ id: 'bitcoin' }, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res.dataLen);
});

// Interval:  m1, m5, m15, m30, h1, h2, h6, h12, d1
// prettier-ignore
CoinCapAPI.getAssets.history({ id: 'bitcoin', interval: 'd1' }, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res.dataLen);
});

CoinCapAPI.getAssets.markets({ id: 'bitcoin' }, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res.dataLen);
});

CoinCapAPI.getRates.collection({}, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res.dataLen);
});

CoinCapAPI.getRates.byId({ id: 'bitcoin' }, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res.dataLen);
});

CoinCapAPI.getExchanges.collection({}, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res.dataLen);
});

// prettier-ignore
CoinCapAPI.getExchanges.byId({ id: 'bitcoin' }, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res.dataLen);
});

// prettier-ignore
CoinCapAPI.getMarkets.collection({ exchangeId: 'quoine' }, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res);
});

CoinCapAPI.getCandles.collection({}, function (err, status, res) {
    if (err) {
        throw `${err}`;
    }

    console.log(res);
});
