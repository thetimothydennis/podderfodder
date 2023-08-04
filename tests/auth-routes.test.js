process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 
import dotenv from 'dotenv';
dotenv.config({ path: `../.env.${process.env.NODE_ENV}` })
import req from 'supertest';
import * as cheerio from 'cheerio';
import app from '../index.js';

describe('unauthenticated routes', () => {
    test('/login should provide a login page', async () => {
        let response = await req(app).get('/login');
        expect(response.statusCode).toBe(200);
        expect(response.req.path).toBe('/login');
    });
    
    test('/app route should redirect to login before auth', async () => {
        let response = await req(app).get('/app');
        expect(response.statusCode).toBe(302);
        expect(response.header.location).toBe('/login')
    });
    
    test('forgotpassword route loads forgotpassword page', async () => {
        let response = await req(app).get('/forgotpassword');
        expect(response.statusCode).toBe(200);
        expect(response.req.path).toBe('/forgotpassword')
    });
    
    test('/register route loads register page', async () => {
        let response = await req(app).get('/register');
        expect(response.statusCode).toBe(200);
        expect(response.req.path).toBe('/register');
    });
});

describe('authenticated routes', () => {
    const agent = req.agent(app);
    beforeAll(async () => {
        const response = await agent.post('/api/login')
        .type('form')
        .send({ username: process.env.TEST_USER, password: process.env.TEST_PASS })
        .expect(302);
        expect(response.header.location).toBe('/app');
    });

    test('access /changepassword after login', async () => {
        const response = await agent.get('/changepassword');
        expect(response.statusCode).toBe(200)
    });

    test('access /app after login', async () => {
        const response = await agent.get('/app');
        expect(response.statusCode).toBe(200);
    });

    test('get user data after login', async () => {
        const response = await agent.get('/api/user-data');
        expect(response.statusCode).toBe(200);
    });
});

describe('test api routes after login', () => {
    const agent = req.agent(app)
    beforeAll(async () => {
        const response = await agent.post('/api/login')
        .type('form')
        .send({ username: process.env.TEST_USER, password: process.env.TEST_PASS })
        .expect(302)
        expect(response.header.location).toBe('/app')
    });

    test('get user and podcasts', async () => {
        const response = await agent.get('/api/user/64c3f9c28cd1da806e118c75');
        expect(response.statusCode).toBe(200);
        expect(response.body.length > 0);
        expect(response.body[0].podcasts.length >= 0);
    });
});