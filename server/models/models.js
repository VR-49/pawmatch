const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://joyceoh:zdYaVmVpYFXwq02H@cluster0.ypurzbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  dbName: 'pawmatch'
})
  .then(() => console.log('Connected to Mongo'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const accountSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isOrg: {type: Boolean, required: true}
})

const humanSchema = new Schema({
  location: String,
  firstName: String,
  lastName: String,
  starredPets: Object,
  bio: String,
  picture: String
});

const shelterSchema = new Schema({
  location: String,
  orgName: String,
  bio: String,
  pet_Ids: Object,
  picture: String
});

const petSchema = new Schema({
  stats: Object,
  personality: String,
  picture: String,
  flagUsers: Object
});

const Account = mongoose.model('account', accountSchema);
const Human = mongoose.model('human', humanSchema);
const Shelter = mongoose.model('shelter', shelterSchema);
const Pet = mongoose.model('pet', petSchema);
  
module.exports = {
  Account, 
  Pet,
  Human,
  Shelter
}  