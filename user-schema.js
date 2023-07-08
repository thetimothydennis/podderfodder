import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.createConnection(process.env.MONGO_URI);

const UserEpiSchema = {
    epi_id: {
        type: String,
        // required: true
    },
    elapsed: {
        type: Number
    }
};

const UserPodSchema = {
    pod_id: {
        type: String,
        // required: true
    },
    episodes: [UserEpiSchema]
};

const UserSchema = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    podcasts: [UserPodSchema]
};

export const User = connection.model("User", UserSchema);