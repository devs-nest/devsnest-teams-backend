import SoftskillUser from '../module/softskillUser.js';

export const general = async (req, res) => {
    try {
        return res.status(200).json({ message: "Yo!" });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const addUser = async (req, res) => {
    try {
        const { username, userid } = req.body;

        if (!username || !userid) {
            return res.status(422).json({ message: "Parameter Missing!" });
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

        return res.status(200).json({ message: "User created.", data: user });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const addUsers = async (req, res) => {
    try {
        const { users } = req.body;

        if (!users) {
            return res.status(422).json({ message: "Parameter Missing!" });
        }

        users.map(user => {
            user.debate = 0,
                user.mockInterviewP = 0,
                user.mockInterviewI = 0,
                user.summarization = 0,
                user.techsummarization = 0,
                user.presentation = 0
        })

        await SoftskillUser.deleteMany({});

        const Users = await SoftskillUser.insertMany(users);

        return res.status(200).json({ message: `${users.length} Users created.`, data: Users });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await SoftskillUser.find({});
        return res.status(200).json({ message: `${users.length} Users Fetched`, data: users });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await SoftskillUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Invalid User ID" });
        }
        return res.status(200).json({ message: `User Fetched`, data: user });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const updateScore = async (req, res) => {
    try {
        const { username, type, tag } = req.body;

        if (!username || !type || !tag) {
            return res.status(422).json({ message: "Parameter Missing!" });
        }

        const user = await SoftskillUser.findOne({ username });

        if (!user) {
            return res.status(422).json({ message: "Username Not Found!" });
        }

        const total = user.total;

        if (tag === 'debate') {
            await user.updateOne({ $inc: { 'debate': type * 2 }, total: total + (type * 2) });
        } else if (tag === 'mockInterviewP') {
            await user.updateOne({ $inc: { 'mockInterviewP': type * 4 }, total: total + (type * 4) });
        } else if (tag === 'mockInterviewI') {
            await user.updateOne({ $inc: { 'mockInterviewI': type * 5 }, total: total + (type * 5) });
        } else if (tag === 'summarization') {
            await user.updateOne({ $inc: { 'summarization': type * 4 }, total: total + (type * 4) });
        } else if (tag === 'techsummarization') {
            await user.updateOne({ $inc: { 'techsummarization': type * 6 }, total: total + (type * 6) });
        } else if (tag === 'presentation') {
            await user.updateOne({ $inc: { 'presentation': type * 10 }, total: total + (type * 10) });
        } else {
            return res.status(422).json({ message: "Invalid Tag!" });
        }

        const data = await SoftskillUser.findOne({ username });

        return res.status(200).json({ message: `Score Updated of user ${username} for ${tag} [${type}].`, data });

    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
}