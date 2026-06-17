const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store (resets when server restarts)
const profiles = [];

// POST /api/profile - create a new profile card
app.post('/api/profile', (req, res) => {
  const { name, bio, imageUrl } = req.body || {};

  const errors = [];
  if (!name || !name.trim()) errors.push('Name is required.');
  if (!bio || !bio.trim()) errors.push('Bio is required.');
  if (imageUrl && imageUrl.trim() && !/^https?:\/\//i.test(imageUrl.trim())) {
    errors.push('Image URL must start with http:// or https://.');
  }

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const profile = {
    id: profiles.length + 1,
    name: name.trim(),
    bio: bio.trim(),
    imageUrl: imageUrl ? imageUrl.trim() : '',
    createdAt: new Date().toISOString()
  };

  profiles.push(profile);
  res.status(201).json({ data: profile });
});

// GET /api/profiles - list all created profiles
app.get('/api/profiles', (req, res) => {
  res.json({ data: profiles });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
