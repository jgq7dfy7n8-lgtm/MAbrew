export const config = { runtime: ‘edge’ };

export default async function handler(req) {
const { searchParams } = new URL(req.url);
const path = searchParams.get(‘path’);

if (!path) {
return new Response(JSON.stringify({ error: ‘Missing path param’ }), {
status: 400,
headers: { ‘Content-Type’: ‘application/json’ },
});
}

const espnUrl = `https://site.api.espn.com/apis/site/v2/sports/${path}`;

try {
const res = await fetch(espnUrl, {
headers: {
‘User-Agent’: ‘Mozilla/5.0’,
‘Accept’: ‘application/json’,
},
});

```
const data = await res.text();

return new Response(data, {
  status: res.status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
  },
});
```

} catch (err) {
return new Response(JSON.stringify({ error: err.message }), {
status: 500,
headers: {
‘Content-Type’: ‘application/json’,
‘Access-Control-Allow-Origin’: ‘*’,
},
});
}
}
