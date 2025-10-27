import express from "express";
import cors from "cors";
import axios from "axios";



const app = express();

app.use(express.json());
app.use(cors());

app.get("/temples", async (req, res) => {
    const { place_id } = req.query;

    if (!place_id) return res.status(400).json({ error: "place_id is required" });

    const url = `${GOOGLE_DETAILS_URL}?key=${GOOGLE_API_KEY}&place_id=${place_id}&fields=name,formatted_address,geometry,rating,user_ratings_total,opening_hours,types,photos,website,formatted_phone_number,editorial_summary`;

    try {
        const { data } = await axios.get(url);
        res.json(data.result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch temple details" });
    }
});

app.get("/temples-list", async (req, res) => {
    try {
        const query = encodeURIComponent("temples in Bhubaneswar");
        const url = `${GOOGLE_TEXTSEARCH_URL}?key=${GOOGLE_API_KEY}&query=${query}`;
        const { data } = await axios.get(url);

        if (!data.results) return res.json({ results: [] });

        const temples = data.results.map((temple) => {
            let imageUrl = temple.photos?.[0]?.photo_reference
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${temple.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                : "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop";

            return {
                name: temple.name,
                image: imageUrl,
                location: temple.formatted_address,
                rating: temple.rating || "N/A",
                userRatingsTotal: temple.user_ratings_total || 0,
                openNow: temple.opening_hours?.open_now ? "Open Now" : "Closed",
                placeId: temple.place_id,
                businessStatus: temple.business_status,
                types: temple.types || []
            };
        });

        res.json({ results: temples });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch temples list" });
    }
});

app.get("/temple-details", async (req, res) => {
    const { place_id } = req.query;
    if (!place_id) return res.status(400).json({ error: "place_id is required" });

    const url = `${GOOGLE_DETAILS_URL}?key=${GOOGLE_API_KEY}&place_id=${place_id}&fields=name,formatted_address,geometry,rating,user_ratings_total,opening_hours,types,photos,website,formatted_phone_number,editorial_summary`;

    try {
        const { data } = await axios.get(url);


        const prompt = `
            Write a short, engaging description of the temple:
            Name: ${data.result.name}
            Location: ${data.result.formatted_address}
            Categories: ${data.result.types?.join(", ") || "N/A"}
            Rating: ${data.result.rating || "N/A"} (${data.user_ratings_total || 0} reviews)
            Opening Status: ${data.opening_hours?.open_now ? "Open Now" : "Closed"}
            Keep it in minimum 3 to 4 paras but could be more to fill a web page.
        `;

        const geminiResp = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    { parts: [{ text: prompt }] }
                ]
            }
        );

        const geminiText =
            geminiResp.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "A sacred place of worship and cultural significance.";

        const finalRes = { ...data.result, description: geminiText };

        res.json(finalRes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch temple details" });
    }
});

app.get("/food-centers", async (req, res) => {
    const query = encodeURIComponent("restaurants in Bhubaneswar");
    const url = `${GOOGLE_TEXTSEARCH_URL}?key=${GOOGLE_API_KEY}&query=${query}`;

    try {
        const { data } = await axios.get(url);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch Google Places data" });
    }
});

app.get("/food-center", async (req, res) => {
    const { place_id } = req.query;

    if (!place_id) {
        return res.status(400).json({ error: "place_id is required" });
    }

    const url = `${GOOGLE_DETAILS_URL}?key=${GOOGLE_API_KEY}&place_id=${place_id}&fields=name,formatted_address,geometry,rating,user_ratings_total,price_level,opening_hours,types,photos,serves_vegetarian_food,editorial_summary`;

    try {
        const { data } = await axios.get(url);

        const vegType = data.result.serves_vegetarian_food
            ? "veg"
            : "unknown";

        res.json({
            ...data.result,
            vegType,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch food center details" });
    }
});

app.get("/photo", async (req, res) => {
    const { ref } = req.query;
    if (!ref) return res.status(400).send("photo_reference required");

    try {
        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${ref}&key=${GOOGLE_API_KEY}`;
        const response = await axios.get(url, { responseType: "arraybuffer" });
        res.set("Content-Type", response.headers["content-type"]);
        res.send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch photo");
    }
});

app.listen(8080, () => {
    console.log(`----- Server running on port 8080 -----`);
})