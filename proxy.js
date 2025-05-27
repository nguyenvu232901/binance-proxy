const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/api/candles', async (req, res) => {
  const { symbol, interval, limit = 500 } = req.query;
  if (!symbol || !interval) {
    return res.status(400).json({ error: 'Missing symbol or interval' });
  }
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ProxyBot/1.0)' } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message, detail: error.response?.data });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});