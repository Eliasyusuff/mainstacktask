import request from 'supertest';
import app from '../src/app';

describe('Products', () => {
    let token: string;
    let newProductId: string;
    

    beforeAll(async () => {
        // Log in to obtain a token
        const loginResponse = await request(app)
            .post('/api/login')
            .send({ username: 'elias', password: 'testpassword' });
        token = loginResponse.body.token;
    });

    it('should create a new product', async () => {
        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Product', price: 10 });
        newProductId = response.body._id; // Saving this for other tests
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test Product');
    });

    it('should fetch all products', async () => {
        const response = await request(app)
            .get('/api/all-products')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should fetch a single product', async () => {
        const response = await request(app)
            .get(`/api/single-product/${newProductId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', newProductId);
    });

    it('should update a product', async () => {
        const response = await request(app)
            .put(`/api/products/${newProductId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ price: 15 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('price', 15);
    });

    it('should delete a product', async () => {
        const response = await request(app)
            .delete(`/api/products/${newProductId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Product successfully deleted');
    });

   
});
