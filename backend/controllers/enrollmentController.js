// get all enrollments
export const getEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({}).sort({createdAt: -1})

  res.status(200).json(enrollments)
}

// get a single enrollment
export const getEnrollment = async (req, res) => {
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
export const createEnrollment = async (req, res) => {
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
export const deleteEnrollment = async (req, res) => {
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
export const updateEnrollment = async (req, res) => {
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
