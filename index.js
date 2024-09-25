const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Your Pexels API key
const apiKey = 'NoL8ytYlwsYIqmkLBboshW909HzoBoBnGZJbpmwAcahp5PF9TAnr9p7Z';

// Endpoint to search for images
app.get('/pexels', async (req, res) => {
    try {
        const query = req.query.query;
        const numResults = parseInt(req.query.results) || 8; // Default to 8 if not provided

        // Ensure the number of results is between 8 and 30
        if (numResults < 2 || numResults > 30) {
            return res.status(400).json({ error: 'Please request between 2 and 30 images.' });
        }

        if (!query) {
            return res.status(400).json({ error: 'Please provide a search query.' });
        }

        const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${numResults}`;
        const headers = {
            'Authorization': apiKey
        };

        // Make the API request to Pexels
        const response = await axios.get(url, { headers });
        const data = response.data;

        // Map and return the image URLs
        const imageUrls = data.photos.map(photo => photo.src.original);
        return res.json({
            query: query,
            count: imageUrls.length,
            images: imageUrls
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching images.' });
    }
});

app.listen(port, () => {
    console.log(`Pexels API app listening at http://localhost:${port}`);
});
