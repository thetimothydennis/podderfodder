import mongoose from 'mongoose';
import 'dotenv/config';

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
    length: Number,
    content: String
});

export const episodes = connection.model("episode", EpisodeSchema);

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
        required: true,
        unique: true
    },
    categories: {
        type: String
    },
    episodes: [EpisodeSchema]
});

export const podcast = connection.model("podcast", PodcastSchema)