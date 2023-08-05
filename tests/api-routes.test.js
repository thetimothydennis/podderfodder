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

    test("attempting to access another user's account throws an error", async () => {
        const response = await agent.get(`/api/user/${process.env.TEST_USER2_ID}`);
        expect(response.statusCode).toBe(401);
    });
});

describe('test other CRUD operations after login', () => {
    let podId = '';
    let epiId = '';
    let podsLength = 0;
    let episLength = 0;
    let feedArr = [
        'https://www.kuaf.com/podcast/the-movement-that-never-was-a-peoples-guide-to-anti-racism-in-the-south-and-arkansas/rss.xml',
        'https://rss.art19.com/smartless',
        'https://podcastfeeds.nbcnews.com/HL4TzgYC',
        'https://feeds.megaphone.fm/TPC3838283892',
        'https://feeds.megaphone.fm/darknetdiaries',
        'https://www.kuaf.com/podcast/ozarks-at-large/rss.xml',
        'https://www.kuaf.com/podcast/blockchain-the-future-of-money/rss.xml'
    ];
    const agent = req.agent(app);
    beforeAll(async () => {
        const response = await agent.post('/api/login')
        .type('form')
        .send({ username: process.env.TEST_USER, password: process.env.TEST_PASS })
        .expect(302);
        expect(response.header.location).toBe('/app');
    });

    feedArr.forEach(feedUrl => {
        test('test api post route', async () => {
            const existing = await agent.get(`/api/user/${USER_ID}`);
            podsLength = existing.body[0].podcasts.length;
            expect(existing.statusCode).toBe(200);
            const response = await agent.post(`/api/user/${USER_ID}`)
                .type('form')
                .send({ feedurl: feedUrl });
                podId = response.body[0].podcasts.pod_id;
                expect(response.statusCode).toBe(200);
                episLength = response.body[0].podcasts.episodes.length;
            const modified = await agent.get(`/api/user/${USER_ID}`);
            expect(modified.body[0].podcasts.length).toBe(podsLength + 1);
            expect(modified.statusCode).toBe(200);
        }, 15000);
    
        test('get podcast after adding to db', async () => {
            const response = await agent.get(`/api/user/${USER_ID}/${podId}`);
            epiId = response.body[0].podcasts.episodes[0]._id;
            expect(response.statusCode).toBe(200);
            expect(response.body.length > 0);
            expect(response.body[0].podcasts.feedurl).toBe(feedUrl);
            expect(response.body[0].podcasts.episodes.length).toBe(episLength);
        });
    
        test('get all podcast episodes after adding to db', async () => {
            const response = await agent.get(`/api/allepisodes/${USER_ID}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(episLength + 2);
        });
    
        test('delete podcast episode', async () => {
            const response = await agent.delete(`/api/user/${USER_ID}/${podId}/${epiId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.modifiedCount).toBe(1);
            const verify = await agent.get(`/api/user/${USER_ID}/${podId}`);
            expect(verify.statusCode).toBe(200);
            expect(verify.body[0].podcasts.episodes.length).toBe(episLength - 1);
        });
    
        test('update podcast episodes', async () => {
            const existing = await agent.get(`/api/user/${USER_ID}/${podId}`);
            expect(existing.statusCode).toBe(200);
            expect(existing.body[0].podcasts.episodes.length).toBe(episLength - 1);
            expect(existing.body[0].podcasts.feedurl).toBe(feedUrl);
            expect(existing.body[0].podcasts._id).toBe(podId);
            const response = await agent.put(`/api/user/${USER_ID}/${podId}`);
            podId = response.body[0].podcasts.pod_id;
            expect(response.statusCode).toBe(200);
            expect(response.body[0].podcasts.episodes.length).toBe(episLength);
            expect(response.body[0].podcasts.feedurl).toBe(feedUrl);
            expect(response.body[0].podcasts.pod_id).toBe(podId);
        });
    
        test('delete podcast from user', async () => {
            const response = await agent.delete(`/api/user/${USER_ID}/${podId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.modifiedCount).toBe(podsLength);
            podId = '';
        });
    })
});