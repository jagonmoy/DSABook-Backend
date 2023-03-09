const js2xmlparser = require("js2xmlparser");

exports.sendResponse = (statusCode,data,req,res) => {
    console.log("any problem")
    const format = req.headers.accept;
    console.log(format)
    if ( format === "application/xml") {
        res.type(format);
        res.status(statusCode).send(js2xmlparser.parse("data",JSON.parse(JSON.stringify({format,data}))));
    }
    else {
        console.log("jhamela koi")
        res.status(statusCode).json({
            format,
            data
        });  
    }
}
exports.sendErrorResponse = (statusCode,data,req,res) => {
    const format = req.headers.accept;
    if ( format === "application/xml") {
        res.type(format);
        res.status(statusCode).send(js2xmlparser.parse("data",JSON.parse(JSON.stringify({format,data}))));
    }
    else {
        res.status(statusCode).json({
            format,
            errors : [
                notUnique = data
            ]
        });  
    }
}