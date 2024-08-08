const { Account } = require('../models/models');

const profileController = {};

// Controller to get a user's profile
profileController.getProfile = async (req, res, next) => {
  try {
    // Deconstruct the username from the request
    const { username } = req.query;
    // Find the user by the usernam
    const user = await Account.findOne({ username });
    
    // If the user isn't found, return an error
    if (!user) {
      return next({ 
        log: 'User not found in getProfile',
        status: 404,
        message: { err: 'User not found' } 
      });
    }
    // If the user is found, send the user data back as JSON
    res.json(user);
  } 
  
  // If an error occurs send the error object back
  catch (err) {
    next({ 
      log: 'Error in getProfile', 
      status: 500, 
      message: { err: 'Failed to fetch profile data' }
    });
  }
};

// Controller to update a user's profile
profileController.updateProfile = async (req, res, next) => {
  try {
    const { username } = req.query;
    // Extract the user data from the request body
    const { firstName, lastName, location, bio } = req.body;
    // Get the filename of the photo if one was uploaded, otherwise set the filename to null
    const photo = req.file ? req.file.filename : null;

    // Create a form object with all the profile data
    const updateData = { firstName, lastName, location, bio };
    if (photo) updateData.photo = photo;

    // Find the user by their username and update their profile with the new data
    const user = await Account.findOneAndUpdate({ username }, updateData, { new: true });

    // If the user is not found return an error
    if (!user) {
      return next({ 
        log: 'User not found in updateProfile',
        status: 404,
        message: { err: 'User not found' } 
      });
    }
    // If the user is found and updated, send the user data back as JSON
    res.json(user);
  } 
  
  // If an error occurs send the error object back
  catch (err) {
    next({ 
      log: 'Error in updateProfile', 
      status: 500, 
      message: { err: 'Failed to update profile data' }
    });
  }
};

module.exports = profileController;