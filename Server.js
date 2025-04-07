// server.js
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3001;

// Middleware to parse form data & JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve everything in the "client" folder
app.use(express.static(path.join(__dirname, "client")));

// GET route for "services" page (optional if you want /services)
app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "services.html"));
});

// POST route for "Book Tow" form
app.post("/api/book-tow", async (req, res) => {
    const { vehicle, location } = req.body;
    console.log("Vehicle:", vehicle, "Location:", location);

    // 1) Configure Nodemailer transporter:
    //    - Here we're using Gmail. Replace 'user' and 'pass' with your actual email/app password.
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "yourGmail@gmail.com",        // Your real Gmail
            pass: "YOUR_APP_PASSWORD"           // App password (if 2FA enabled) or account password if 2FA is off
        }
    });

    try {
        // 2) Send the email
        await transporter.sendMail({
            from: `"Joe's Towing" <yourGmail@gmail.com>`, // Sender info
            to: "joestowing2024@gmail.com",               // Where you want to receive requests
            subject: "New Tow Request",
            text: `Vehicle: ${vehicle}\nLocation: ${location}`,
            html: `
        <h3>New Tow Request</h3>
        <p><strong>Vehicle:</strong> ${vehicle}</p>
        <p><strong>Location:</strong> ${location}</p>
      `
        });

        // If sending is successful
        return res.json({
            success: true,
            message: "Your tow request has been received and an email was sent!"
        });

    } catch (error) {
        // If there's an error sending the email
        console.error("Error sending email:", error);
        return res.status(500).json({
            success: false,
            message: "Error sending email. Please try again later."
        });
    }
});

// Another example route for a button click
app.post("/api/get-quote", (req, res) => {
    // Could do calculations or fetch from DB
    const exampleQuote = "$99 for a basic tow within 10 miles";
    res.json({ success: true, message: exampleQuote });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



