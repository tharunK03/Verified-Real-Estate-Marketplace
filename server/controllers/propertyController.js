const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      sellerId: req.user.id // from authMiddleware
    });
    await newProperty.save();
    res.status(201).json({ message: 'Property submitted for verification', property: newProperty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findByIdAndUpdate(propertyId, { status: 'verified' }, { new: true });
    res.status(200).json({ message: 'Property verified', property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
