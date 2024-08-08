// /**
//  * @jest-environment node
//  */
// const request = require('supertest');
// const mongoose = require('mongoose');
// const Account = require('../models/models.js');
// const app = require('../server');
// const { login } = require('../controllers/userController');
// const userRouter = require('../routes/userRouter');

// const { MongoMemoryServer } = require('mongodb-memory-server');
// // const fs = require('fs');
// // const path = require('path');
// const { describe } = require('node:test'); // found one

// describe('setting the stage and managing login tests', () => {
//   let mongod;

//   beforeAll(async () => {
//     mongod = await MongoMemoryServer.create();
//     const uri = mongod.getUri();
//     await mongoose.connect(uri);
//   });

//   afterAll(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongod.stop();
//   });

//   afterEach(async () => {
//     const collections = mongoose.connection.collections;
//     for (const key in collections) {
//       const collection = collections[key];
//       await collection.deleteMany(); // Removed the stray 'g'
//     }
//   });

//   describe('Server-side Login Integration Tests', () => {
//     // const testFile = path.resolve(__dirname, '../server/controllers/userController.test.json')

//     beforeAll(async () => {
//       //define code and test data to be tested
//       const testUser = new Account({
//         username: 'testuser',
//         password: 'pw123',
//       });
//       await testUser.save();
//     });

//     // afterAll(() => {
//     //     //Clean up leftover that needs cleaning eg. cleaning out the db if necessary
//     // });
//     it('should handle login requests by checking the username and password correctly', () => {
//       return request(app)
//         .post('/api/auth/login')
//         .send({ username: 'testuser', password: 'pw123' })
//         .then((response) => {
//           console.log(response.body);
//           expect(response.status).toBe(200);
//           expect(response.body).toHaveProperty('username', 'testuser');
//         })
//         .catch((err) => {
//             console.error('Test failed: ', err);
//             throw err;
//         });
//     });

//     it('should handle errors correctly', () => {
//       return request(app)
//         .post('/api/auth/login')
//         .send({ username: 'wronguser', password: 'incorrectpw' })
//         .then((response) => {
//           expect(response.status).toBe(500);
//           expect(response.body).toHaveProperty(
//             'message',
//             'incorrect username or password'
//           );
//         });
//     });

//     // it('do the thing eg. process json correctly', () => {
//     //   // check json
//     //   const data = fs.readFileSync(testJsonFile, 'utf-8');
//     //   const parsedData = JSON.parse(data);

//     //   const result = login(parsedData);

//     //   expect(result).toBeDefined();
//     // });

//     // test other functionality with more 'its'
//   });
// });
