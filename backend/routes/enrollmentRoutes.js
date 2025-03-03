import express from 'express';
import {
  createEnrollment,
  getEnrollment,
  getEnrollments,
  deleteEnrollment,
  updateEnrollment
} from '../controllers/enrollmentController.js';

const router = express.Router()

// GET all enrollments
router.get('/', getEnrollments)

// GET a single enrollment
router.get('/:id', getEnrollment)

// POST a new enrollment
router.post('/', createEnrollment)

// DELETE a enrollment
router.delete('/:id', deleteEnrollment)

// UPDATE a enrollment
router.patch('/:id', updateEnrollment)

export default enrollmenRoutes
