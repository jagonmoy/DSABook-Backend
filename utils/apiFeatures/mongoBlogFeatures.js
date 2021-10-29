const MongoBlog = require("../../models/blogModel");

class mongoAPIFeatures {
    filter(req) {
        const queryObj = {...req.query};
        const excludedfields = ['sort','fields','page','limit'];
        excludedfields.forEach(el => delete queryObj[el]);
        let query = MongoBlog.find(queryObj);
        return query;
    }
    sort(query,req){
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }
        else {
            query = query.sort('-createdAt');

        }
        return query;
    }
    limitingFields(query,req) {
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
          }
        else query = query.select('-__v');
        return query;
    }
    paginate(query,req) {
        const page = req.query.page * 1 || 1 ;
        const limit = req.query.limit * 1 || 3 ;
        const skip = (page-1)*limit ;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const numberDocuments = MongoBlog.countDocuments();
            if ( skip >= numberDocuments) return null;
        }
        return query;
    }    

}
module.exports = {mongoAPIFeatures};