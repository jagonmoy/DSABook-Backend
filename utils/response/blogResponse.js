const js2xmlparser = require("js2xmlparser");

exports.JSONBlogResponse = (statusCode,blogs,res,format) => {
    res.status(statusCode).json({
        format,
        blogs
     });
}
exports.XMLBlogResponse = (statusCode,blogs,res,format) => {
    const blogsWithFormatDeclared = {
        format,
        blogs
    }
    res.status(statusCode).send(js2xmlparser.parse("blogs",JSON.parse(JSON.stringify(blogsWithFormatDeclared))));
}

exports.JSONErrorResponse = (statusCode,error,res) => {
    res.status(statusCode).json({
        error,
      });
}
exports.XMLErrorResponse = (statusCode,error,res) => {
    res.status(statusCode).send(js2xmlparser.parse("error",JSON.parse(JSON.stringify(error))));
}