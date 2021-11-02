const blogController = require('../controller/blogController');
const {BlogService} = require("../service/blogService");
const {MongoBlogDao} = require("../dao/blog/mongoBlogDao")
const response = require("../utils/response/blogResponse")
const sinon = require('sinon')
const mongoBlogDao = new MongoBlogDao();
const blogService = new BlogService(mongoBlogDao);
test("it should pass" , async () => {
    expect(true).toBe(true);
});

const request1 = {
    headers : {
        accept : "application/json"
    },
    body: {
       
    },
    params: {
        id : "ksdasdasdasd"   
    }
}

const expectedJSONBlogErrorResponse = {
    format: "json" ,
    error : "blog Doesnot Exist"
}


describe("get blog", () => {
    describe("If the request is invalid",() => {
        test("if the request format is json", () => {
            const blogStub = sinon.stub(blogService,"getBlog");
            blogStub.withArgs(request).returns("blog doesnot exist");
            const blog = blogService.getBlog(request1);
            expect(blog).toEqual("blog doesnot exist"); 
            blogStub.restore();

            const formatStub = sinon.stub(response,"JSONErrorResponse");
            formatStub.withArgs(404,request,null,"json").returns(expectedJSONBlogErrorResponse);
            const responseFormat = response.JSONErrorResponse(404,request,null,"json");
            expect(responseFormat).toEqual({
                format: "json" ,
                error : "blog Doesnot Exist"
            })
            formatStub.restore();
        })
    })
})