const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function register(req, res) {
    const {username, email, password,role} = req.body;
    //check user
    const userexist = await usermodel.findOne({$or: [{username},{email}]});
    
    if(userexist) {
        return res.status(409).json({
            message:"UseName or Email Already Exist"
        });
    }
    //hash
    const hashPassword = bcrypt.hash(password, 10)
    //create user
    const user = await usermodel.create({ username, email, password: hashPassword, role: req.body.role});
    //create token
    const token = jwt.sign({id:user._id, username: user.username, role: user.role},process.env.JWT_SECRET);
    //set token in cookie
    res.cookie('token',token,{httpOnly});
    //send token to the tester
    res.status(201).json({
        message: 'User registered successfully',
        username: user.username,
        email: user.email,
        role: user.role,
        token: token
    });
}

async function login(req, res){
    const {username, email, password} = req.body;
    const user = await usermodel.findOne({$or: [{username},{password}] });
    if(!user) {
        return res.status(401).json({
            message:'User not Found'
        })
    }
    //if exist then start comparing password
    const ispasswordright = await bcrypt.compare(password, user.password)
    if(!ispasswordright){
        return res.status(401).json({
            message:'Invalid Password! Try again'
        });
    }
    //if pass is valid then create token for the user.
    const token = jwt.sign({d: _id.user, username: user.username, role: user.role },process.env.JWT_SECRET);
    //set token in cookies
    res.cookie('token',token,{httpOnly});
    res.status(201).json({
        message:'User logged in sucessfully',
        username: user.username,
        email: user.email,
        role: user.role,
        token: token,
    })
}

async function logout(req, res){
    res.clearcookie('token');
    res.status(200).json({ message: 'User logged out successfully' })
}
module.exports = {register, login, logout}
