// Vercel Serverless Function - ESPN proxy
// Uses Node’s built-in https module (works on all Node versions)

import https from ‘https’;

export default function handler(req, res) {
const path = req.query.path;

if (!path) {
res.status(400).json({ error: ‘Missing path query parameter’ });
return;
}

const espnUrl = `https://site.api.espn.com/apis/site/v2/sports/${path}`;

https.get(espnUrl, {
headers: {
‘User-Agent’: ‘Mozilla/5.0’,
‘Accept’: ‘application/json’,
},
}, (espnRes) => {
let data = ‘’;
espnRes.on(‘data’, (chunk) => { data += chunk; });
espnRes.on(‘end’, () => {
res.setHeader(‘Content-Type’, ‘application/json’);
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Cache-Control’, ‘s-maxage=60, stale-while-revalidate=30’);
res.status(espnRes.statusCode || 200).send(data);
});
}).on(‘error’, (err) => {
res.status(500).json({ error: err.message });
});
}
