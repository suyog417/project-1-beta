import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create default if not exists to return structure
      about = await About.create({});
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const updatedAbout = await About.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
