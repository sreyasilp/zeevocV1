import Extensions from "../models/extensions.js";

// Create a new extension
export const createExtension = async (req, res) => {
  try {
    const newExtension = new Extensions(req.body);
    const savedExtension = await newExtension.save();
    res.status(201).json(savedExtension);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all extensions
export const getAllExtensions = async (req, res) => {
  try {
    const extensions = await Extensions.find();
    res.status(200).json(extensions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single extension by its ID
export const getExtensionById = async (req, res) => {
  try {
    const extension = await Extensions.findById(req.params.id);
    if (!extension) {
      return res.status(404).json({ message: 'Extension not found' });
    }
    res.status(200).json(extension);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a extension by its ID
export const updateExtension = async (req, res) => {
  try {
    const extension = await Extensions.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!extension) {
      return res.status(404).json({ message: 'Extension not found' });
    }
    res.status(200).json(extension);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a extension by its ID
export const deleteExtension = async (req, res) => {
  try {
    const extension = await Extensions.findByIdAndDelete(req.params.id);
    if (!extension) {
      return res.status(404).json({ message: 'Extension not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single extension by its URL key
export const getExtensionByUrlKey = async (req, res) => {
  try {
    const extension = await Extensions.findOne({ urlKey: req.params.urlKey });
    if (!extension) {
      return res.status(404).json({ message: 'Extension not found' });
    }
    res.status(200).json(extension);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
