const js2xmlparser = require("js2xmlparser");

exports.JSONReponse = (statusCode,data,res) => {
    res.status(statusCode).json({
        data
     });
}
exports.XMLResponse = (statusCode,data,res) => {
    res.status(statusCode).send(js2xmlparser.parse("data",JSON.parse(JSON.stringify(data))));
}

exports.errorResponse = (statusCode,res) => {
    res.status(statusCode).json({
        status: "failed",
        message: "Not Found",
      });
}
exports.defaultReponse = (statusCode,data,res) => {
    res.status(statusCode).json({
        data
     });
}
