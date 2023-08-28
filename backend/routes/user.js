const express = require('express')

// controller functions
const { loginUser, signupUser, getAllUsers,deleteUser } = require('../controllers/userController')



const router = express.Router()


router.get('/', getAllUsers);
router.delete('/:id',deleteUser);
// login route
router.post('/login', loginUser)
// router.put('/:id', updateUser);

// signup route
router.post('/signup', signupUser)


module.exports = router