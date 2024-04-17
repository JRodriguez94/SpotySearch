const express = require('express');
const { refreshSpotifyToken } = require('./auth');
const { searchArtists } = require('./spotifyController');

const app = express();
app.use(express.json());

refreshSpotifyToken();

app.get('/search/artists', async (req, res) => {
    const artistName = req.query.name;
    if (!artistName) {
        return res.status(400).json({ error: 'Artist name is required' });
    }

    try {
        const artists = await searchArtists(artistName);
        res.json(artists);
    } catch (error) {
        console.error('Error in searching artists:', error);
        res.status(500).json({ error: 'Failed to retrieve artist data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
