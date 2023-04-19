const js2xmlparser = require("js2xmlparser");

exports.sendResponse = (statusCode,data,req,res) => {
    const format = req.headers.accept;
    if ( format === "application/xml") {
        if(!data) res.status(statusCode).end();
        else {
            res.type(format);
            res.status(statusCode).send(js2xmlparser.parse("data",JSON.parse(JSON.stringify(data))));
        }
    }
    else {
        res.type('application/json')
        if(!data) res.status(statusCode).end();
        else res.status(statusCode).json(data);  
    }
}
exports.sendErrorResponse = (statusCode,data,req,res) => {
    const format = req.headers.accept;
    if ( format === "application/xml") {
        res.status(statusCode).send(js2xmlparser.parse("data",JSON.parse(JSON.stringify(data))));
    }
    else res.status(statusCode).json(data);  
}