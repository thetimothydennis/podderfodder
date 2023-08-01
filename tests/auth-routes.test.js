import dotenv from 'dotenv';
dotenv.config({ path: `../.env.${process.env.NODE_ENV}` })
import request from 'supertest';
import reqTest from 'superagent';
import * as cheerio from 'cheerio';
import app from '../index.js';

describe('unauthenticated routes', () => {
    test('/login should provide a login page', async () => {
        let response = await request(app).get('/login');
        expect(response.statusCode).toBe(200);
        expect(response.req.path).toBe('/login');
    });
    
    test('/app route should redirect to login before auth', async () => {
        let response = await request(app).get('/app');
        expect(response.statusCode).toBe(302);
        expect(response.header.location).toBe('/login')
    });
    
    test('forgotpassword route loads forgotpassword page', async () => {
        let response = await request(app).get('/forgotpassword');
        expect(response.statusCode).toBe(200);
        expect(response.req.path).toBe('/forgotpassword')
    });
    
    test('/register route loads register page', async () => {
        let response = await request(app).get('/register');
        expect(response.statusCode).toBe(200);
        expect(response.req.path).toBe('/register');
    });
});

describe('authenticated routes', () => {

    beforeAll(async () => {
        await reqTest.post('/api/login')
            .send({ username: process.env.TEST_USER, password: process.env.TEST_PASS })
            .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7')
    });

    test('should allow access to /app after auth', async () => {

    });
});