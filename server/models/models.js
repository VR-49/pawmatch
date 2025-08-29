const mongoose = require('mongoose');

const connect = async () => {
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

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isOrg: { type: Boolean, required: true }, // true = shelter, false = human
  firstName: String,
  lastName: String,
  orgName: String, // only for shelters
  location: String,
  bio: String,
  picture: String,
  favorites: [Object], // optional
  pet_Ids: [Object], // only for shelters
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

const shelterSchema = new Schema(
  {
    name: { type: String, required: true }, // Shelter name
    location: { type: String, required: true }, // e.g., city, address, or zip
    petIds: [{ type: Schema.Types.ObjectId, ref: 'Pet' }], // Pets belonging to this shelter
    adminIds: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users who can manage this shelter
    bio: { type: String, default: '' }, // Optional description about the shelter
    picture: { type: String, default: '' }, // Optional logo or image
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt

const User = mongoose.model('user', userSchema);
const Pet = mongoose.model('pet', petSchema);
const Shelter = mongoose.model('shelter', shelterSchema);

module.exports = {
  User,
  Pet,
  Shelter,
};

module.exports = connect;
