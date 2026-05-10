// Vercel Serverless Function - default Node runtime
// Proxies ESPN’s hidden API to bypass browser CORS

export default async function handler(req, res) {
const path = req.query.path;

if (!path) {
res.status(400).json({ error: ‘Missing path query parameter’ });
return;
}

const espnUrl = `https://site.api.espn.com/apis/site/v2/sports/${path}`;

try {
const response = await fetch(espnUrl, {
headers: {
‘User-Agent’: ‘Mozilla/5.0’,
‘Accept’: ‘application/json’,
},
});

```
const data = await response.text();

res.setHeader('Content-Type', 'application/json');
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
res.status(response.status).send(data);
```

} catch (err) {
res.status(500).json({ error: err.message });
}
}
