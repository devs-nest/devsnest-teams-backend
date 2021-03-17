import Admin from '../module/admin.js';
import bcrypt from 'bcryptjs';

export const addAdmin = async(req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(422).json({message: "Parameter Missing!"});
        }

        const hash = await bcrypt.hash(password, 12);

        const admin = await Admin.create({
            username,
            password: hash
        });

        delete admin._doc.password;
        return res.status(200).json({message: "Account Created.", data: admin});

    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}

export const checkPassword = async(req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(422).json({message: "Parameter Missing!"});
        }

        const admin = await Admin.findOne({username: username});

        if (!admin) {
            return res.status(403).json({message: `No Admin Found with username: ${username}`});
        }

        const matched = await bcrypt.compare(password, admin.password);

        if (!matched) {
            return res.status(403).json({message: 'Invalid Username or Password!'});
        }

        delete admin._doc.password;
        return res.status(200).json({message: "Admin Login Successfully.", data: admin});

    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}