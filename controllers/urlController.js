import { nanoid } from 'nanoid';
import urlDB from '../models/UrlStore.js';

export const createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  const code = shortcode || nanoid(6);

  if (urlDB.has(code)) {
    return res.status(400).json({ message: 'Shortcode already in use' });
  }

  const expiry = Date.now() + validity * 60 * 1000;

  urlDB.set(code, {
    originalUrl: url,
    shortCode: code,
    expiry,
    createdAt: Date.now(),
    clicks: 0,
    clickDetails: []
  });

  res.status(201).json({
    shortLink: `http://localhost:5000/shorturls/${code}`,
    expiry: new Date(expiry).toISOString()
  });
};

export const getUrlStats = (req, res) => {
  const code = req.params.code;
  const data = urlDB.get(code);

  if (!data) return res.status(404).json({ message: 'Shortcode not found' });

  res.json({
    originalUrl: data.originalUrl,
    shortCode: data.shortCode,
    createdAt: new Date(data.createdAt).toISOString(),
    expiry: new Date(data.expiry).toISOString(),
    totalClicks: data.clicks,
    clickDetails: data.clickDetails
  });
};
