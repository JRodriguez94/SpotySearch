const axios = require('axios');
require('dotenv').config();

let spotifyToken = '';

const refreshSpotifyToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            },
            timeout: 10000 // Timeout aumentado a 10 segundos
        });
        spotifyToken = response.data.access_token;
        console.log("Spotify token refreshed.");
        setTimeout(refreshSpotifyToken, response.data.expires_in * 1000);
    } catch (error) {
        console.error("Error al refrescar el token de Spotify: ", error.message);
        setTimeout(refreshSpotifyToken, 10000);  // Reintentar después de 10 segundos si falla
    }
};

module.exports = {
    refreshSpotifyToken,
    getSpotifyToken: () => spotifyToken
};
