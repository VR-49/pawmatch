const { error } = require('console');
const User = require('../models/models');

const profileController = {};

profileController.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
};

profileController.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, location, bio } = req.body;
    const photo = req.file ? req.file.filename : null;

    const updateData = { firstName, lastName, location, bio };
    if (photo) updateData.photo = photo;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json(user);
  }  catch (err) {
    res.status(500).json({ error: 'Failed to update profile data' });
  }
};

module.exports = profileController;