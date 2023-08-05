process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 
import dotenv from 'dotenv';
dotenv.config({ path: `../.env.${process.env.NODE_ENV}` })
import req from 'supertest';
import app from '../index.js';

const USER_ID = process.env.TEST_USER_ID;

describe('test api get routes after login', () => {
    const agent = req.agent(app)
    beforeAll(async () => {
        const response = await agent.post('/api/login')
        .type('form')
        .send({ username: process.env.TEST_USER, password: process.env.TEST_PASS })
        .expect(302);
        expect(response.header.location).toBe('/app');
    });

    test('get user and podcasts', async () => {
        const response = await agent.get(`/api/user/${USER_ID}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length > 0);
        expect(response.body[0].podcasts.length >= 0);
    });

    test('get user podcast', async () => {
        const response = await agent.get(`/api/user/${USER_ID}/64ce961806886d34bdf632ae`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length > 0);
        expect(response.body[0].podcasts.feedurl).toBe('https://www.kuaf.com/podcast/the-new-classroom-podcast/rss.xml');
        expect(response.body[0].podcasts.episodes.length > 0);
    });

    test('get user podcast episode', async () => {
        const response = await agent.get(`/api/user/${USER_ID}/64ce961806886d34bdf632ae/64ce961806886d34bdf632b0`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length > 0);
        expect(response.body[0].podcasts.episodes.epi_url).toBe('https://cpa.ds.npr.org/kuaf/audio/2020/10/the_new_classroom_episode_1.mp3');
    });

    test('get all user episodes', async () => {
        const response = await agent.get(`/api/allepisodes/${USER_ID}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });
});

describe('test other CRUD operations after login', () => {
    let podId = '';
    let epiId = '';
    let feedUrl = 'https://www.kuaf.com/podcast/the-movement-that-never-was-a-peoples-guide-to-anti-racism-in-the-south-and-arkansas/rss.xml';
    const agent = req.agent(app);
    beforeAll(async () => {
        const response = await agent.post('/api/login')
        .type('form')
        .send({ username: process.env.TEST_USER, password: process.env.TEST_PASS })
        .expect(302);
        expect(response.header.location).toBe('/app');
    });

    test('test api post route', async () => {
        const existing = await agent.get(`/api/user/${USER_ID}`);
        expect(existing.body[0].podcasts.length).toBe(1);
        expect(existing.statusCode).toBe(200);
        const response = await agent.post(`/api/user/${USER_ID}`)
            .type('form')
            .send({ feedurl: 'https://www.kuaf.com/podcast/the-movement-that-never-was-a-peoples-guide-to-anti-racism-in-the-south-and-arkansas/rss.xml' });
            podId = response.body[0].podcasts.pod_id;
            expect(response.statusCode).toBe(200);
        const modified = await agent.get(`/api/user/${USER_ID}`);
        expect(modified.body[0].podcasts.length).toBe(2);
        expect(modified.statusCode).toBe(200);
    });

    test('get podcast after adding to db', async () => {
        const response = await agent.get(`/api/user/${USER_ID}/${podId}`);
        epiId = response.body[0].podcasts.episodes[0]._id;
        expect(response.statusCode).toBe(200);
        expect(response.body.length > 0);
        expect(response.body[0].podcasts.feedurl).toBe(feedUrl);
        expect(response.body[0].podcasts.episodes.length).toBe(12);
    });

    test('get all podcast episodes after adding to db', async () => {
        const response = await agent.get(`/api/allepisodes/${USER_ID}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(14);
    });

    test('delete podcast episode', async () => {
        const existing = await agent.get(`/api/user/${USER_ID}/${podId}`);
        expect(existing.statusCode).toBe(200);
        expect(existing.body[0].podcasts.episodes.length).toBe(12);
        const response = await agent.delete(`/api/user/${USER_ID}/${podId}/${epiId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
        const verify = await agent.get(`/api/user/${USER_ID}/${podId}`);
        expect(verify.statusCode).toBe(200);
        expect(verify.body[0].podcasts.episodes.length).toBe(11);
    });

    test('update podcast episodes', async () => {
        const existing = await agent.get(`/api/user/${USER_ID}/${podId}`);
        expect(existing.statusCode).toBe(200);
        expect(existing.body[0].podcasts.episodes.length).toBe(11);
        expect(existing.body[0].podcasts.feedurl).toBe(feedUrl);
        expect(existing.body[0].podcasts._id).toBe(podId);
        const response = await agent.put(`/api/user/${USER_ID}/${podId}`);
        podId = response.body[0].podcasts.pod_id;
        expect(response.statusCode).toBe(200);
        expect(response.body[0].podcasts.episodes.length).toBe(12);
        expect(response.body[0].podcasts.feedurl).toBe(feedUrl);
        expect(response.body[0].podcasts.pod_id).toBe(podId);
    });

    test('delete podcast from user', async () => {
        const response = await agent.delete(`/api/user/${USER_ID}/${podId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
        podId = '';
    });

});