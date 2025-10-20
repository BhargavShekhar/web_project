import express from "express";
import cors from "cors";
import axios from "axios";

const GOOGLE_MAP_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const GOOGLE_API_KEY = "";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/temples", async (req, res) => {
    const query = encodeURIComponent("temples in Bhubaneswar");
    const url = `${GOOGLE_MAP_URL}?key=${GOOGLE_API_KEY}&query=${query}`;

    try {
        const { data } = await axios.get(url);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch Google Places data" });
    }
});

app.listen(8080, () => {
    console.log(`----- Server running on port 8080 -----`);
})