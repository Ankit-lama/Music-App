const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function authArtist(req, res, next){
    const token = req.cookies.token;
    if(!token)
    {
        return res.status(401).json({
            message:'Unathorized'
        });
    }
    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role != 'artist'){
             return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            message:"Unathorized"
        });
    }
}

async function authUser(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    try{
        const decoded = await jwt.verify(token, process.env.IMAGEKIT_PRIVATE_KEY);
        if(decoded.role !== 'user' || 'artist')
        {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.body = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {authArtist,authUser}