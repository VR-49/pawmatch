/**
 * @jest-environment node
 */



const fs = require('fs');
const path = require('path');
const { login } = require('../controllers/userController')

describe('Server-side Login Integration Tests', () => {
    const testFile = path.resolve(__dirname, '../server/controllers/userController.test.json')

    beforeAll(() => {
        //define code and test data to be tested 
    });

    afterAll(() => {
        //Clean up leftover that needs cleaning eg. cleaning out the db if necessary
    });
    it('do the thing eg. process json correctly', () => {
        // check json
        //const data = fs.readFileSynd(testJsonFile, 'utf-8');
        //const parsedData = JSON.parse(data)

        //const result = login(parsedData);

        //expect(result).toBe(blasdksalkdjflkjasd;fljsas;dlj);


    }

    //test other functionality with more its
    


}



