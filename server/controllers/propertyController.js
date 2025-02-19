const Property = require("../models/Property");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

// ✅ Ensure `uploads/` directory exists
const uploadDir = path.join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Handle Property Creation & File Uploads
const createProperty = async (req, res) => { // ✅ Ensure function is correctly declared
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir; // ✅ Set directory to save files
  form.keepExtensions = true;
  form.multiples = false; // Allow single file per field

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Formidable Error:", err);
      return res.status(500).json({ message: "File upload error", error: err });
    }

    try {
      const { title, type, location, price, sqft } = fields;

      // ✅ Validate required fields
      if (!title || !type || !location || !price || !sqft || !files.image || !files.document) {
        return res.status(400).json({ message: "⚠️ All fields and files are required!" });
      }

      // ✅ Handle file paths correctly (handling Formidable versions)
      const imagePath = files.image.filepath || files.image.path || files.image[0]?.filepath;
      const documentPath = files.document.filepath || files.document.path || files.document[0]?.filepath;

      // ✅ Ensure the file was uploaded properly
      if (!fs.existsSync(imagePath) || !fs.existsSync(documentPath)) {
        return res.status(400).json({ message: "⚠️ File upload failed. Try again." });
      }

      // ✅ Create a new Property record
      const newProperty = new Property({
        title,
        type,
        location,
        price: Number(price), // ✅ Convert to number
        sqft: Number(sqft),
        image: imagePath.replace(uploadDir, "/uploads/"), // ✅ Save relative file path
        document: documentPath.replace(uploadDir, "/uploads/"),
        status: "Pending Admin Approval",
      });

      await newProperty.save();
      res.status(201).json({ message: "✅ Property submitted for admin approval" });
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: "⚠️ Server Error", error: error.message });
    }
  });
};

// ✅ Fetch Only Approved Properties
const getVerifiedProperties = async (req, res) => { // ✅ Ensure function is correctly declared
  try {
    const properties = await Property.find({ status: "Approved" });
    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error fetching verified properties:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Ensure the module exports both functions
module.exports = { createProperty, getVerifiedProperties };