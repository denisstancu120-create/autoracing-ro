const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 AutoRacingHub'
  }
});

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'AutoRacing news backend is running' });
});

app.get('/news', async (req, res) => {
  try {
    const feed = await parser.parseURL(
      'https://news.google.com/rss/search?q=masini+formula+1&hl=ro&gl=RO&ceid=RO:ro'
    );

    const items = (feed.items || []).slice(0, 10).map(item => ({
      title: item.title || 'Știre auto',
      link: item.link || '#',
      pubDate: item.pubDate || '',
      source: feed.title || 'Google News'
    }));

    res.json({ items });
  } catch (error) {
    console.error('NEWS ERROR:', error.message);
    res.status(500).json({ error: 'Nu am putut încărca știrile.' });
  }
});

app.listen(PORT, () => {
  console.log(`News backend running on port ${PORT}`);
});
