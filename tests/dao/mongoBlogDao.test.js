const  MongoBlog = require("../../models/blogModel");
const {MongoBlogDao} = require("../../dao/blog/mongoBlogDao");
const {mongoAPIFeatures} = require("../../utils/apiFeatures/mongoBlogFeatures");
const {mockRequest, mockResponse } = require("mock-req-res");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const sinontest = sinonTest(sinon);
const mongoBlogDao = new MongoBlogDao();

const options = {
    body : {
        username : "someone" ,
        blogHeadline: "some Headline",
        blogDescription: "some Blog"
    },
    params: {
        id: "123"
    }
}
const blog = {
    username : "someone" ,
    blogHeadline: "some Headline",
    blogDescription: "some Blog"
}
const query = "query";
const blogs = [
    {
    username : "someone" ,
    blogHeadline: "some Headline",
    blogDescription: "some Blog"
    }
]
const createdBlog = {
    username : "someone" ,
    blogHeadline: "some Headline",
    blogDescription: "some Blog"
}
const updatedBlog = {
    username : "someone 2" ,
    blogHeadline: "some Headline 2 ",
    blogDescription: "some Blog 2"
}
test("Testing getAllBlogs Method of mongoblogDao Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const getFilterQueryStub = this.stub(mongoAPIFeatures.prototype,"filter").returns(query);
    const getSortQueryStub = this.stub(mongoAPIFeatures.prototype,"sort").returns(query);
    const getLimitingFieldsQueryStub = this.stub( mongoAPIFeatures.prototype,"limitingFields").returns(query);
    const getPaginateQueryStub = this.stub( mongoAPIFeatures.prototype,"paginate").returns(blogs);

    const blogFromDao = await mongoBlogDao.getAllBlogs(req,res);

    expect(blogFromDao).toEqual(blogs);
    sinon.assert.calledOnce(getFilterQueryStub);
    sinon.assert.calledOnce(getSortQueryStub);
    sinon.assert.calledOnce(getLimitingFieldsQueryStub);
    sinon.assert.calledOnce(getPaginateQueryStub);
    sinon.assert.calledWithExactly(getFilterQueryStub,req);
    sinon.assert.calledWithExactly(getSortQueryStub,query,req);
    sinon.assert.calledWithExactly(getLimitingFieldsQueryStub,query,req);
    sinon.assert.calledWithExactly(getPaginateQueryStub,query,req);
   
}))

test("Testing getBlog Method of mongoblogDao Class when there is no error", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const getBlogStub = this.stub(MongoBlog,"findById").returns(blog);

    const blogFromDao = await mongoBlogDao.getBlog(req,res);

    expect(blogFromDao).toEqual(blog)
    sinon.assert.calledOnce(getBlogStub);
    sinon.assert.calledWithExactly(getBlogStub,req.params.id);
}))
test("Testing getBlog Method of mongoblogDao Class when there is error", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const getBlogStub = this.stub(MongoBlog,"findById").returns(Promise.reject());

    const blogFromDao = await mongoBlogDao.getBlog(req,res);

    expect(blogFromDao).toEqual("blog doesnot exist")
    sinon.assert.calledOnce(getBlogStub);
    sinon.assert.calledWithExactly(getBlogStub,req.params.id);
}))

test("Testing createBlog Method of mongoblogDao Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const createBlogStub = this.stub(MongoBlog,"create").returns(createdBlog);

    const blogFromDao = await mongoBlogDao.createBlog(req,res);

    expect(blogFromDao).toEqual(createdBlog);
    sinon.assert.calledOnce(createBlogStub);
    sinon.assert.calledWithExactly(createBlogStub,req.body);
}))
test("Testing updateBlog Method of mongoblogDao Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const updateBlogStub = this.stub(MongoBlog,"findByIdAndUpdate").returns(updatedBlog);

    const blogFromDao = await mongoBlogDao.updateBlog(req,res);

    expect(blogFromDao).toEqual(updatedBlog);
    sinon.assert.calledOnce(updateBlogStub);
    sinon.assert.calledWithExactly(updateBlogStub,req.params.id,req.body,{new: true});
}))
test("Testing deleteBlog Method of mongoblogDao Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const deleteBlogStub = this.stub(MongoBlog,"findByIdAndDelete").returns({});

    const blogFromDao = await mongoBlogDao.deleteBlog(req,res);

    expect(blogFromDao).toEqual({});
    sinon.assert.calledOnce(deleteBlogStub);
    sinon.assert.calledWithExactly(deleteBlogStub,req.params.id);
}))
