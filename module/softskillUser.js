import mongoose from 'mongoose';

const softskillUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'UserName is Required']
    },
    userid: {
        type: String
    },
    debate: {
        type: Number
    },
    mockInterviewP: {
        type: Number
    },
    mockInterviewI: {
        type: Number
    },
    summarization: {
        type: Number
    },
    techsummarization: {
        type: Number
    },
    presentation: {
        type: Number
    },
    total: {
        type: Number,
        default: function() {
            return this.debate + this.mockInterviewP + this.mockInterviewP + this.summarization + this.techsummarization + this.presentation;
        }
    }
}, { timestamps: true });

const softskillUserModel = mongoose.model('SoftskillUser', softskillUserSchema);
export default softskillUserModel;