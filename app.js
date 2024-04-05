const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle POST requests to /shopify_webhooks
app.post('/shopify_webhooks', (req, res) => {
    console.log("-------------- New Shopify Webhook Request --------------");
    console.log("Headers:", JSON.stringify(req.headers, null, 3));
    console.log("Body:", JSON.stringify(req.body, null, 3));
    res.json({ message: "Received Shopify webhook" });
});

// Generic handler for all other requests
app.all('/*', (req, res) => {
    console.log("-------------- New Request --------------");
    console.log("Path:", req.path);
    console.log("Headers:", JSON.stringify(req.headers, null, 3));
    console.log("Body:", JSON.stringify(req.body, null, 3));
    res.json({ message: "Thank you for the message" });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

