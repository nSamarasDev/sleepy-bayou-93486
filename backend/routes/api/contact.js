const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const slugify = require("slugify");
const nodemailer = require("nodemailer");
const auth = require("../../middleware/auth");
const Contact = require("../../models/Contact");

// @route POST api/contact
// @desc: Save new contact form
// @access public
router.post(
  "/",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please enter a valid email address").isEmail(),
    body("description", "Description is required").notEmpty(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new contact object from the request body
      const newContact = new Contact(req.body);

      // Set the slug using slugify
      newContact.slug = slugify(newContact.email, { lower: true });

      // Save the contact to the database
      await newContact.save();

      // Send email notification
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: "n.samaras4@outlook.com",
        subject: "New contact form submission",
        text: `Name: ${newContact.name}\nEmail: ${newContact.email}\nDescription: ${newContact.description}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // Return success response
      res.status(201).json(newContact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/contact
// @desc: Get all contcts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    // Find all contacts in the database
    const contacts = await Contact.find();

    // Return success response with contacts as JSON data
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route: GET /api/contact/:id
// @description: Get a contact by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    // Find the contact with the specified id
    const contact = await Contact.findById(req.params.id);

    // If no contact is found, return a 404 Not Found response
    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    // Return success response with contact as JSON data
    res.status(200).json(contact);
  } catch (err) {
    console.error(err.message);

    // If the id is not in a valid ObjectId format, return a 400 Bad Request response
    if (err.kind === "ObjectId") {
      return res.status(400).send("Invalid id");
    }

    res.status(500).send("Server Error");
  }
});

// Route: DELETE /api/contact/:id
// Description: Delete a contact by id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find the contact with the specified id and delete it
    const contact = await Contact.findByIdAndDelete(req.params.id);

    // If no contact is found, return a 404 Not Found response
    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    // Return success response with message
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error(err.message);

    // If the id is not in a valid ObjectId format, return a 400 Bad Request response
    if (err.kind === "ObjectId") {
      return res.status(400).send("Invalid id");
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
