const mongoose = require('mongoose');

export const connect = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('missing vairable while connecting to db');
      return;
    }

    await mongoose.connect(uri);
  } catch (error) {
    console.error('Error connecting to the db: ', error);
    process.exit(1);
  }
};

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isOrg: { type: Boolean, required: true },
  favorites: [Object],
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  location: { type: String, default: '' },
  bio: { type: String, default: '' },
  photo: { type: String, default: '' },
});

const humanSchema = new Schema({
  username: String,
  location: String,
  firstName: String,
  lastName: String,
  starredPets: Object,
  bio: String,
  picture: String,
});

const shelterSchema = new Schema({
  username: String,
  location: String,
  orgName: String,
  bio: String,
  pet_Ids: Object,
  picture: String,
});

const petSchema = new Schema({
  species: { type: String, required: true },
  breed: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  stats: {
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
  },
  personality: String,
  about: String,
  picture: String,
  flagUsers: Object,
});

const Account = mongoose.model('account', accountSchema);
const Human = mongoose.model('human', humanSchema);
const Shelter = mongoose.model('shelter', shelterSchema);
const Pet = mongoose.model('pet', petSchema);

module.exports = {
  Account,
  Pet,
  Human,
  Shelter,
};
