import mongoose from 'mongoose';

const softskillTeamSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Team ID is Required']
    },
    name: {
        type: String,
        required: [true, 'Team Name is Required']
    },
    members: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'SoftskillUser'
        }
    ],
    leader: {
        type: mongoose.Types.ObjectId,
        ref: 'SoftskillUser'
    },
    
}, { timestamps: true });

const softskillTeamModel = mongoose.model('SoftskillTeam', softskillTeamSchema);
export default softskillTeamModel;