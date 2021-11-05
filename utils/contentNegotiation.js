const js2xmlparser = require("js2xmlparser");

exports.sendBlogResponse = (statusCode,blogs,req,res) => {
    const format = req.headers.accept;
    if ( format === "application/json" ||  format === "*/*") {
        res.status(statusCode).json({
            format,
            blogs
        });  
    }
    else if ( format === "application/xml") {
        res.type(format);
        res.status(statusCode).send(js2xmlparser.parse("blogs",JSON.parse(JSON.stringify({format,blogs}))));
    }
}

exports.sendAuthResponse = (statusCode,user,req,res,token) => {
    const format = req.headers.accept;
    if ( format === "application/json" || format === "*/*" ) {
        res.status(statusCode).json({
            token,
            format,
            user
        });  
    }
    else if ( format === "application/xml") {
        res.type(format);
        res.status(statusCode).send(js2xmlparser.parse("user",JSON.parse(JSON.stringify({token,format,user}))));
    }
}
exports.sendUserResponse = (statusCode,user,req,res) => {
    const format = req.headers.accept;
    if ( format === "application/json" || format === "*/*" ) {
        res.status(statusCode).json({
            format,
            user
        });  
    }
    else if ( format === "application/xml") {
        res.type(format);
        res.status(statusCode).send(js2xmlparser.parse("user",JSON.parse(JSON.stringify({format,user}))));
    }
}