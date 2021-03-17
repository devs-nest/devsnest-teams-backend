import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true });

const adminModel = mongoose.model('Admin', adminSchema);
export default adminModel;