const js2xmlparser = require("js2xmlparser");

exports.JSONReponse = (statusCode,posts,res) => {
    res.status(statusCode).json({
        data: {
            posts,
        },
     });
}
exports.XMLResponse = (statusCode,posts,res) => {
    console.log(posts);
    console.log("ki hocche");
    res.status(statusCode).send(js2xmlparser.parse("data",JSON.parse(JSON.stringify(posts))));
}

exports.errorResponse = (statusCode,res) => {
    res.status(statusCode).json({
        status: "failed",
        message: "Not Found",
      });
}
