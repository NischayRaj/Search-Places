const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query, limit } = req.body;
    const response = await axios.get(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      {
        params: { namePrefix: query, limit },
        headers: {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key": process.env.API_KEY, // Add your API key here
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
