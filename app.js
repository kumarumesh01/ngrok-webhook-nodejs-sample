// const express = require('express');
// const app = express();
// const port = 3000;

// // Middleware to parse JSON and URL-encoded bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route to handle POST requests to /shopify_webhooks
// app.post('/shopify_webhooks', (req, res) => {
//     console.log("-------------- New Shopify Webhook Request --------------");
//     console.log("Headers:", JSON.stringify(req.headers, null, 3));
//     console.log("Body:", JSON.stringify(req.body, null, 3));
//     res.json({ message: "Received Shopify webhook" });
// });

// // Generic handler for all other requests
// app.all('/*', (req, res) => {
//     console.log("-------------- New Request --------------");
//     console.log("Path:", req.path);
//     console.log("Headers:", JSON.stringify(req.headers, null, 3));
//     console.log("Body:", JSON.stringify(req.body, null, 3));
//     res.json({ message: "Thank you for the message" });
// });

// // Starting the server
// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });


const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch'); // Make sure to install node-fetch

const app = express();
const port = 3000;
const shopifySecret = '013e7a183554e02708af37bff697ef3d894312dd887a65c5ed25aec813b8c5f4';

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle POST requests to /shopify_webhooks
app.post('/shopify_webhooks', async (req, res) => {
    console.log("-------------- New Shopify Webhook Request --------------");

    // Verify Shopify HMAC
    const hmacHeader = req.headers['x-shopify-hmac-sha256'];
    const body = JSON.stringify(req.body);
    const calculatedHmac = crypto
        .createHmac('sha256', shopifySecret)
        .update(body, 'utf8')
        .digest('base64');

    if (crypto.timingSafeEqual(Buffer.from(calculatedHmac), Buffer.from(hmacHeader))) {
        console.log("Verification Successful");

        // Forward data to the Rails application
        try {
            const response = await fetch('https://api.neetprep.com/v2api/rpc/shopify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibnBfc2hvcGlmeV9sb2dpbiIsImlkIjpudWxsLCJleHAiOjE3MjcyODUwODgsImlhdCI6MTcxMTczMzA4OH0.j8Z_F9lvm9fVVqNijh1l4iRrpTK-sZDNUHsNH6yd7Ds'
                },
                body: body // Using the original request body
            });

            const responseData = await response.json();
            console.log("Rails application response:", responseData);
            res.json({ message: "Received Shopify webhook and forwarded data to Rails application" });
        } catch (error) {
            console.error("Error forwarding data to Rails application:", error);
            res.status(500).json({ message: "Error forwarding data to Rails application" });
        }
    } else {
        console.log("Verification Failed");
        res.status(401).json({ message: "Unauthorized: Verification failed" });
    }
});

// Generic handler for all other requests
app.all('/*', (req, res) => {
    console.log("-------------- New Request --------------");
    res.json({ message: "Thank you for the message" });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

