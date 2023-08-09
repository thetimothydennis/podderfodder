import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { config } from 'dotenv';
config({ path: `./.env.${process.env.NODE_ENV}`})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.createConnection(process.env.MONGO_URI);

const EpisodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pubDate: Date,
    web_url: String,
    epi_url: {
        type: String,
        required: true,
    },
    duration: Number,
    content: String
});

export const Episodes = connection.model("Episodes", EpisodeSchema);

const PodcastSchema = new mongoose.Schema({
    show_title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: String
    },
    image: {
        type: String
    },
    feedurl: {
        type: String,
        required: true
    },
    categories: {
        type: String
    },
    buildDate: {
        type: Date
    },
    episodes: [EpisodeSchema]
});

export const Podcast = connection.model("Podcast", PodcastSchema);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    githubId: {
        type: String
    },
    googleId: {
        type: String
    },
    podcasts: [PodcastSchema]
});

userSchema.plugin(passportLocalMongoose);

export const User = connection.model("User", userSchema);
