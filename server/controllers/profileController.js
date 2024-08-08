const { Account } = require('../models/models');

const profileController = {};

profileController.getProfile = async (req, res, next) => {
  try {
    const { username } = req.query;
    const user = await Account.findOne({ username });
    if (!user) {
      return next({ 
        log: 'User not found in getProfile',
        status: 404,
        message: { err: 'User not found' } 
      });
    }
    res.json(user);
  } catch (err) {
    next({ 
      log: 'Error in getProfile', 
      status: 500, 
      message: { err: 'Failed to fetch profile data' }
    });
  }
};

profileController.updateProfile = async (req, res, next) => {
  try {
    const { username } = req.query;
    const { firstName, lastName, location, bio } = req.body;
    const photo = req.file ? req.file.filename : null;

    const updateData = { firstName, lastName, location, bio };
    if (photo) updateData.photo = photo;

    const user = await Account.findOneAndUpdate({ username }, updateData, { new: true });

    if (!user) {
      return next({ 
        log: 'User not found in updateProfile',
        status: 404,
        message: { err: 'User not found' } 
      });
    }
    res.json(user);
  } catch (err) {
    next({ 
      log: 'Error in updateProfile', 
      status: 500, 
      message: { err: 'Failed to update profile data' }
    });
  }
};

module.exports = profileController;