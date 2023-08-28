const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
    
        // create a token
        const token = createToken(user._id);
    
        // Include email, username, and phone in the response object
        res.status(200).json({
            email: user.email,
            username: user.username,
            phone: user.phone,
            id:user._id,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// signup a user
const signupUser = async (req, res) => {
    const { email, password, username, phone } = req.body;

    try {
        const user = await User.signup(email, password, username, phone);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({
            email: user.email,
            username: user.username,
            phone: user.phone,
            id:user._id,
             token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// delete a user
const deleteUser = async (req, res) => {
    const userId = req.params.id; // Assuming you're passing the user ID as a route parameter

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { signupUser, loginUser, getAllUsers, deleteUser};
 
// const updateUser = async (req, res) => {
//     const userId = req.params.id; // Assuming you're passing the user ID as a route parameter
//     const updates = req.body;      // New data for updating user

//     try {
//         // Find the user by ID and update the fields
//         const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

//         if (!updatedUser) {
//             res.status(404).json({ error: 'User not found' });
//             return;
//         }

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
