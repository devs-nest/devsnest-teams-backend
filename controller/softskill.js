import mongoose from 'mongoose';
import softskillUserModel from '../module/softskillUser.js';
import SoftskillUser from '../module/softskillUser.js';

export const general = async(req, res) => {
    try {
        return res.status(200).json({message: "Yo!"});
    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}

export const addUser = async(req, res) => {
    try {
        const { username, userid } = req.body;

        if(!username || !userid) {
            return res.status(422).json({message: "Parameter Missing!"});
        }

        const user = await SoftskillUser.create({
            username,
            userid,
            debate: 0,
            mockInterviewP: 0,
            mockInterviewI: 0,
            summarization: 0,
            techsummarization: 0,
            presentation: 0
        })

        return res.status(200).json({message: "User created.", data: user});
    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}

export const addUsers = async(req, res) => {
    try {
        const { users } = req.body;

        if(!users) {
            return res.status(422).json({message: "Parameter Missing!"});
        }

        users.map(user => {
            user.debate = 0,
            user.mockInterviewP = 0,
            user.mockInterviewI = 0,
            user.summarization = 0,
            user.techsummarization = 0,
            user.presentation = 0   
        })

        await softskillUserModel.deleteMany({});

        const Users = await softskillUserModel.insertMany(users);

        return res.status(200).json({message: "Users created.", data: Users});
    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await softskillUserModel.find({});
        return res.status(200).json({message: "Users Delivered", data: users})
    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}