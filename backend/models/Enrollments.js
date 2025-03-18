import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  coursetype: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => {
      if (!createdAt) return createdAt;
      const day = String(createdAt.getDate()).padStart(2, '0');
      const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = createdAt.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  status: { type: String, default: 'pending' },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;