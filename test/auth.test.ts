import request from 'supertest';
import app from '../src/app';

describe('Authentication', () => {
    let newUser: { username: string; password: string };


    beforeAll(async () => {
        // You could set up test data here if needed
        newUser = { username: 'elias', password: 'testpassword' };
    });

    // it('should sign up a new user', async () => {
    //     const response = await request(app)
    //         .post('/api/sign-up')
    //         .send(newUser);
    //     expect(response.statusCode).toBe(201);
    //     expect(response.body).toHaveProperty('token');
    // });

    it('should log in an existing user', async () => {
        const response = await request(app)
            .post('/api/login')
            .send(newUser);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
