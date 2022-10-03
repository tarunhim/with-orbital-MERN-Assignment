import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    website: String,
    email:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;