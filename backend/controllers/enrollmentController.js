const Enrollment = require('../models/enrollmentModel')
const mongoose = require('mongoose')

// get all enrollments
const getEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({}).sort({createdAt: -1})

  res.status(200).json(enrollments)
}

// get a single enrollment
const getEnrollment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such enrollment'})
  }

  const enrollment = await Enrollment.findById(id)

  if (!enrollment) {
    return res.status(404).json({error: 'No such enrollment'})
  }

  res.status(200).json(enrollment)
}


// create new enrollment
const createEnrollment = async (req, res) => {
  const {course_id, user_id} = req.body

  // add doc to db
  try {
    const enrollment = await Enrollment.create({ course_id, user_id })
    res.status(200).json(enrollment)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a enrollment
const deleteEnrollment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such enrollment'})
  }

  const enrollment = await Enrollment.findByIdAndDelete({_id: id})

  if (!enrollment) {
    return res.status(400).json({error: 'No such enrollment'})
  }

  res.status(200).json(enrollment)
}

// update a enrollment
const updateEnrollment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such enrollment'})
  }

  const enrollment = await Enrollment.findByIdAndUpdate({_id: id}, {
    ...req.body
  })

  if (!enrollment) {
    return res.status(400).json({error: 'No such enrollment'})
  }

  res.status(200).json(enrollment)
}


module.exports = {
  getEnrollments,
  getEnrollment,
  createEnrollment,
  deleteEnrollment,
  updateEnrollment
}
