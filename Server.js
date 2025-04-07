//--------------------------------------------------
// server.js
//--------------------------------------------------
const express = require("express");
const cors = require("cors");
const path = require("path");

// Create an Express app
const app = express();
const PORT = 3001; // or any port you prefer

//--------------------------------------------------
// MIDDLEWARE
//--------------------------------------------------
// Allow cross-origin requests (useful if you open index.html directly or from another domain)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------------
// STATIC FILES
//--------------------------------------------------
// Serve everything in the "client" folder at http://localhost:3001/
//
// e.g., index.html => http://localhost:3001/
//       about.html => http://localhost:3001/about.html
//       any images/css/js => http://localhost:3001/<filename>
app.use(express.static(path.join(__dirname, "client")));

//--------------------------------------------------
// ROUTES
//--------------------------------------------------

// Example POST route for form submissions
// e.g., a form <form action="/api/request-service" method="POST">
app.post("/api/request-service", (req, res) => {
    // Grab form data from the request body
    const { name, phone } = req.body;

    console.log("New Towing Request:", name, phone);

    // You could save this to a database, send an email, etc.
    // For now, just return a JSON response confirming receipt.
    return res.json({
        success: true,
        message: "Request received! Thank you."
    });
});

//--------------------------------------------------
// START THE SERVER
//--------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

