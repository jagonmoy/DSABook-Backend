const js2xmlparser = require("js2xmlparser");

exports.JSONReponse = (statusCode,blogs,res) => {
    res.status(statusCode).json({
        data: {
            blogs,
        },
     });
}
exports.XMLResponse = (statusCode,blogs,res) => {
    console.log(blogs);
    res.status(statusCode).send(js2xmlparser.parse("data",JSON.parse(JSON.stringify(blogs))));
}

exports.errorResponse = (statusCode,res) => {
    res.status(statusCode).json({
        status: "failed",
        message: "Not Found",
      });
}
exports.defaultReponse = (statusCode,blogs,res) => {
    res.status(statusCode).json({
        data: {
            blogs,
        },
     });
}
