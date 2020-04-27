const http = require('http');
const https = require('https');

module.exports = {
    objSize: function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    },

    ReturnKey: (n, h) => {
        for (var a in h) {
            for (var b in h[a]) {
                if ((h[a][b] + '').indexOf(n) > -1) {
                    return a;
                }
            }
        }
        return null;
    },

    getJSON: (options, onResult) => {
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
    },
};
