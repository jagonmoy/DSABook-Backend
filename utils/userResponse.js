const js2xmlparser = require("js2xmlparser");

exports.JSONUserReponse = (statusCode,users,res) => {
    res.status(statusCode).json({
        users
     });
}
exports.XMLUserResponse = (statusCode,users,res) => {
    res.status(statusCode).send(js2xmlparser.parse("users",JSON.parse(JSON.stringify(users))));
}

exports.errorUserResponse = (statusCode,res) => {
    res.status(statusCode).json({
        status: "failed",
        message: "Not Found",
      });
}
exports.defaultUserReponse = (statusCode,users,res) => {
    res.status(statusCode).json({
        users
     });
}
