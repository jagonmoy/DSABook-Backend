const js2xmlparser = require("js2xmlparser");

exports.JSONBlogResponse = (statusCode,blogs,res) => {
    res.status(statusCode).json({
        blogs
     });
}
exports.XMLBlogResponse = (statusCode,blogs,res) => {
    res.status(statusCode).send(js2xmlparser.parse("blogs",JSON.parse(JSON.stringify(blogs))));
}

exports.errorBlogResponse = (statusCode,error,res) => {
    res.status(statusCode).json({
        error,
      });
}
exports.defaultBlogResponse = (statusCode,blogs,res) => {
    res.status(statusCode).json({
        blogs
     });
}