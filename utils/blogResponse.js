const js2xmlparser = require("js2xmlparser");

exports.JSONAuthReponse = (statusCode,user,token,status,res) => {
    res.status(statusCode).json({
        status,
        token,
        user
     });
}
exports.XMLAuthResponse = (statusCode,users,token,status,res) => {
    res.status(statusCode).send(js2xmlparser.parse("users",JSON.parse(JSON.stringify(users))));
}

exports.errorAuthResponse = (statusCode,error,res) => {
    res.status(statusCode).json({
        status: "failed",
        message: error,
      });
}
exports.defaultAuthReponse = (statusCode,users,token,status,res) => {
    res.status(statusCode).json({
        token,
        users
     });
}