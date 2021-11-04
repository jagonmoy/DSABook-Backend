const js2xmlparser = require("js2xmlparser");

exports.JSONBlogResponse = (statusCode,blogs,res,format) => {
    res.status(statusCode).json({
        format,
        blogs
     });
    
}
exports.XMLBlogResponse = (statusCode,blogs,res,format) => {
    res.type('application/xml');
    res.status(statusCode).send(js2xmlparser.parse("blogs",JSON.parse(JSON.stringify({format,blogs}))));

}
