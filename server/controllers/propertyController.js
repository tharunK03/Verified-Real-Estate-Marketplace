const Property = require("../models/Property");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

// ✅ Ensure `uploads/` directory exists
const uploadDir = path.join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // ✅ Create folder if it doesn't exist
}

// ✅ Handle Property Creation & File Uploads
exports.createProperty = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir; // ✅ Set directory to save files
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Formidable Error:", err);
      return res.status(500).json({ message: "File upload error", error: err });
    }

    try {
      const { title, type, location, price, sqft } = fields;

      if (!title || !type || !location || !price || !sqft || !files.image || !files.document) {
        return res.status(400).json({ message: "All fields and files are required!" });
      }

      // ✅ Get file paths
      const imagePath = files.image.filepath || files.image.path;
      const documentPath = files.document.filepath || files.document.path;

      const newProperty = new Property({
        title,
        type,
        location,
        price,
        sqft,
        image: imagePath, // ✅ Save file paths
        document: documentPath,
        status: "Pending Admin Approval",
      });

      await newProperty.save();
      res.status(201).json({ message: "Property submitted for admin approval" });
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
};
