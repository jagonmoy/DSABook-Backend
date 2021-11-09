const {MongoBlogDao} = require("../../dao/blog/mongoBlogDao");
const {BlogService} = require("../../service/blogService");
const { mockRequest, mockResponse } = require("mock-req-res");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const sinontest = sinonTest(sinon);
const mongoBlogDao = new MongoBlogDao();
const blogService = new BlogService(mongoBlogDao);


const options = {
    body : {
        username : "someone" ,
        blogHeadline: "some Headline",
        blogDescription: "some Blog"
    }
}
const blog = {
    username : "someone" ,
    blogHeadline: "some Headline",
    blogDescription: "some Blog"
}
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


test("Testing getBlog Method of BlogService Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const getBlogStub = this.stub(mongoBlogDao,"getBlog").returns(blog);

    const blogFromDao = await blogService.getBlog(req,res);

    expect(blogFromDao).toEqual(blog)
    sinon.assert.calledOnce(getBlogStub);
    sinon.assert.calledWithExactly(getBlogStub,req);
}))

test("Testing getAllBlogs Method of BlogService Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const getAllBlogsStub = this.stub(mongoBlogDao,"getAllBlogs").returns(blogs);

    const blogFromDao = await blogService.getAllBlogs(req,res);

    expect(blogFromDao).toEqual(blogs)
    sinon.assert.calledOnce(getAllBlogsStub);
    sinon.assert.calledWithExactly(getAllBlogsStub,req);
}))

test("Testing createBlog Method of BlogService Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const createBlogStub = this.stub(mongoBlogDao,"createBlog").returns(createdBlog);

    const blogFromDao = await blogService.createBlog(req,res);
    expect(blogFromDao).toEqual(blog)
    sinon.assert.calledOnce(createBlogStub);
    sinon.assert.calledWithExactly(createBlogStub,req);
}))
test("Testing deleteBlog Method of BlogService Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const deleteBlogStub = this.stub(mongoBlogDao,"deleteBlog").returns({});

    const blogFromDao = await blogService.deleteBlog(req,res);
    expect(blogFromDao).toEqual({})
    sinon.assert.calledOnce(deleteBlogStub);
    sinon.assert.calledWithExactly(deleteBlogStub,req);
}))
test("Testing updateBlog Method of BlogService Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const updateBlogStub = this.stub(mongoBlogDao,"updateBlog").returns(updatedBlog);

    const blogFromDao = await blogService.updateBlog(req,res);
    expect(blogFromDao).toEqual(updatedBlog)
    sinon.assert.calledOnce(updateBlogStub);
    sinon.assert.calledWithExactly(updateBlogStub,req);
}))