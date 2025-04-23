const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3001;

// Middleware to parse form data & JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from the project root
app.use(express.static(path.join(__dirname)));

// GET route for pages if needed (optional unless using routers)
app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "services.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/gallery", (req, res) => {
    res.sendFile(path.join(__dirname, "gallery.html"));
});

// POST route for "Book Tow" form
app.post("/api/book-tow", async (req, res) => {
    const { vehicle, location } = req.body;
    console.log("Vehicle:", vehicle, "Location:", location);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "yourGmail@gmail.com",
            pass: "YOUR_APP_PASSWORD"
        }
    });

    try {
        await transporter.sendMail({
            from: `"Joe's Towing" <yourGmail@gmail.com>`,
            to: "joestowing2024@gmail.com",
            subject: "New Tow Request",
            text: `Vehicle: ${vehicle}\nLocation: ${location}`,
            html: `
                <h3>New Tow Request</h3>
                <p><strong>Vehicle:</strong> ${vehicle}</p>
                <p><strong>Location:</strong> ${location}</p>
            `
        });

        res.json({
            success: true,
            message: "Your tow request has been received and an email was sent!"
        });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            success: false,
            message: "Error sending email. Please try again later."
        });
    }
});

// Example POST route
app.post("/api/get-quote", (req, res) => {
    const exampleQuote = "$99 for a basic tow within 10 miles";
    res.json({ success: true, message: exampleQuote });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
