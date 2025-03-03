import mongoose from 'mongoose';
import Enrollment from '../models/Enrollments'; // Assuming you have a model for Enrollment

// get all enrollments
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({}).sort({ createdAt: -1 });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
  }
};

// get a single enrollment
export const getEnrollment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such enrollment' });
  }

  try {
    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
      return res.status(404).json({ error: 'No such enrollment' });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
  }
};

// create new enrollment
export const createEnrollment = async (req, res) => {
  const { name, email, phone, city, coursetype } = req.body;

  try {
    if (!name || !email || !phone || !city || !coursetype) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const enrollment = await Enrollment.create({
      name,
      email,
      phone,
      city,
      coursetype,
    });
    res.status(201).json(enrollment); // 201 Created for successful creation
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(400).json({ error: error.message });
  }
};

// delete a enrollment
export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such enrollment' });
  }

  try {
    const enrollment = await Enrollment.findByIdAndDelete({ _id: id });

    if (!enrollment) {
      return res.status(404).json({ error: 'No such enrollment' });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
  }
};

// update a enrollment
export const updateEnrollment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such enrollment' });
  }

  try {
    const enrollment = await Enrollment.findByIdAndUpdate({ _id: id }, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run model validators on update
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'No such enrollment' });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: error.message }); // Handle server errors
  }
};