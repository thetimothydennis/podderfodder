import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import passportLocalMongoose from 'passport-local-mongoose';
import 'dotenv/config';

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const EpisodeSchema = new Schema({
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

const PodcastSchema = new Schema({
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
    episodes: [EpisodeSchema]
});

export const Podcast = connection.model("Podcast", PodcastSchema);

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    podcasts: [PodcastSchema],
    authStrategy: {
        type: String,
        default: "local",
    },
    refreshToken: {
        type: [Session],
    },
});

User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
});

User.plugin(passportLocalMongoose);

export default mongoose.model("User", User);
