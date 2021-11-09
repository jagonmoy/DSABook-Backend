const js2xmlparser = require("js2xmlparser");

exports.JSONUserResponse = (statusCode,users,res) => {
    res.status(statusCode).json({
        users
     });
}
exports.XMLUserResponse = (statusCode,users,res) => {
    res.status(statusCode).send(js2xmlparser.parse("users",JSON.parse(JSON.stringify(users))));
}

exports.errorUserResponse = (statusCode,error,res) => {
    res.status(statusCode).json({
        status: "failed",
        error,
        message: "Not Found",
      });
}
exports.defaultUserReponse = (statusCode,users,res) => {
    res.status(statusCode).json({
        users
     });
}