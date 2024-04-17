const axios = require('axios');
const { getSpotifyToken } = require('./auth');

// Función para buscar artistas
const searchArtists = async (artistName) => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=10`, {
            headers: { 'Authorization': `Bearer ${getSpotifyToken()}` }
        });
        return response.data.artists.items;
    } catch (error) {
        console.error('Error searching artists:', error);
        throw error;
    }
};

module.exports = {
    searchArtists
};
