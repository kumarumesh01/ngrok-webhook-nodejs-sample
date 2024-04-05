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

// const express = require('express');
// const fetch = require('node-fetch'); // Make sure you've installed node-fetch
// const app = express();
// const port = 3000;

// // Middleware to parse JSON and URL-encoded bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Function to forward data to the specified URL
// async function forwardDataToAPI(bodyData) {
//     const url = "https://api.neetprep.com/v2api/rpc/shopify";
//     const headers = {
//         "Content-Type": "application/json",
//         "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibnBfc2hvcGlmeV9sb2dpbiIsImlkIjpudWxsLCJleHAiOjE3MjcyODUwODgsImlhdCI6MTcxMTczMzA4OH0.j8Z_F9lvm9fVVqNijh1l4iRrpTK-sZDNUHsNH6yd7Ds"
//     };

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(bodyData),
//         });

//         if (response.ok) {
//             const responseData = await response.json();
//             console.log("Data successfully sent to API", responseData);
//         } else {
//             console.error("Response from API was not ok", await response.text());
//         }
//     } catch (error) {
//         console.error("Error sending data to API", error);
//     }
// }

// // Route to handle POST requests to /shopify_webhooks
// app.post('/shopify_webhooks', (req, res) => {
//     console.log("-------------- New Shopify Webhook Request --------------");
//     console.log("Headers:", JSON.stringify(req.headers, null, 3));
//     console.log("Body:", JSON.stringify(req.body, null, 3));

//     // Forward the received data to the external API
//     forwardDataToAPI(req.body);

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

