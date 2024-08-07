const request = require('supertest');

const server = 'http://localhost:3000';

describe('Signup Test', () => {
    describe('/api/auth/signup', () => {
        describe('POST', () => {
            it('responds with 200 status and returns something', () => {
                return request(server)
                .post('/api/auth/signup')
                .send({
                    "username": "hello999",
                    "password": "hello999",
                    "email": "hello999@gmail.com",
                    "isOrg": false
                })
                .expect(200)
                .then(response => {
                    //console.log(response.body);
                    expect(response.body).toEqual('hello999');
                });
            });
            it('successfully removes testuser from db', () => {
                return request(server)
                .delete('/api/auth/delete/hello999')
                .expect(200)
                .then(response => {
                    //console.log(response.body);
                    expect(response.body.deletedCount).toEqual(1);
                    expect(response.body.acknowledged).toBeTruthy();
                })
            })
        });
    });
});