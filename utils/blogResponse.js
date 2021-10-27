const js2xmlparser = require("js2xmlparser");

exports.JSONBlogReponse = (statusCode,blogs,res) => {
    res.status(statusCode).json({
        blogs
     });
}
exports.XMLBlogResponse = (statusCode,blogs,res) => {
    res.status(statusCode).send(js2xmlparser.parse("blogs",JSON.parse(JSON.stringify(blogs))));
}

exports.errorBlogResponse = (statusCode,res) => {
    res.status(statusCode).json({
        status: "failed",
        message: "Not Found",
      });
}
exports.defaultBlogReponse = (statusCode,blogs,res) => {
    res.status(statusCode).json({
        blogs
     });
}
