const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {v4: uuidv4} = require('uuid');


//MiddleWare Implementation for parsing JSON and URL-encoded data
router.use(express.urlencoded({extended: false}));

router.use((req, res, next) => {
    try {
        console.log(`${req.method} ${req.url}`);
        next();
    } catch(error) {
        res.status(500).json({
            message: 'Error in logging request',
            error: error.message,
        })
    }
});

//Fetch
router.get('/users', async (req, res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch(error){
        res.status(500).json({
            message:'Error in fetching users',
        error: error.message});
    }
})

//Create
router.post('/users', async(req,res)=> {
    try {
        const user = new User({
            _id: uuidv4(),
            ...req.body
        });
        await user.save();
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json({
            message:'Error in creating user',
            error: error.message,
        })
    }
})

//Update
router.put('/users', async(req,res) => {
    try {
        const {id} = req.query;
        if(!id) {
            return res.status(400).json({
                message: 'User ID is required',
            });
        }
        const user = await User.findByIDAndUpdate(id,req.body, {new:true});
        if(!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        res.json(user);
    } catch(error) {
        res.status(500).json({
            message: 'Error in Updating User',
            error: error.message
        })
    }
})


//Delete
router.delete('/users', async(req,user)=> {
    try {
        const {id} = req.query;
        if(!id) {
            return res.status(400).json({
                message: 'User ID is required',
            });
        }
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({
                message: 'User not found',
                error: error.message,
            })
        }
        res.json(user);
    } catch(error) {
        res.status(500).json({
            message: 'Error in Deleting User',
            error: error.message
        })
    }
})


module.exports = router;