const fs = require('fs');

exports.checkID = (req,res,next,val) => {
    /* const user = posts.find(el => el.user_id === val);
    if (!user) {
        return res.status(404).json({
            status : 'Failure' ,
            message : 'Not found'
        });
    } */
    next();
}

exports.checkUser = (req,res,next) => {
    if (!req.body.name) {
        return res.status(404).json({
            status : 'Failure' ,
            message : 'Failed to Create a User'
        });
    }
    next();
}

exports.getAllUsers = (req,res) => {
    res.status(500).json({
       status : "error",
       message : "get All users"
    });
}
exports.getUser = (req,res) => {
    res.status(500).json({
       status : "error",
       message : "get a user"
    });
}
exports.createUser = (req,res) => {
    res.status(500).json({
       status : "error",
       message : "create user"
    });
}
exports.updateUser = (req,res) => {
    res.status(500).json({
       status : "error",
       message : "update user"
    });
}
exports.deleteUser = (req,res) => {
    res.status(500).json({
       status : "error",
       message : "delete User"
    });
}




