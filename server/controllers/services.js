import Services from "../models/services.js";

// Create a new service
export const createService = async (req, res) => {
  try {
    const newService = new Services(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single service by its ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service by its ID
export const updateService = async (req, res) => {
  try {
    const service = await Services.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service by its ID
export const deleteService = async (req, res) => {
  try {
    const service = await Services.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceByUrlKey = async (req, res) => {
  try {
    const service = await Services.findOne({ urlKey: req.params.urlKey });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
