const {MongoBlogDao} = require("../../dao/blog/mongoBlogDao");
const {BlogService} = require("../../service/blogService");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const sinontest = sinonTest(sinon);
const mongoBlogDao = new MongoBlogDao();
const blogService = new BlogService(mongoBlogDao);

const req = {
     paramas : {
         id : 0
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


test("Testing Get Blog Method of Blog Service Class", sinontest(async function() {
    const getBlogStub = this.stub(mongoBlogDao,"getBlog");
    getBlogStub.withArgs(req).returns(blog);

    const blogFromDao = await blogService.getBlog(req);
    expect(blogFromDao).toEqual(blog)
    sinon.assert.calledOnce(getBlogStub);
    sinon.assert.calledWithExactly(getBlogStub,req);
}))

test("Testing Get All Blogs Method of Blog Service Class", sinontest(async function() {
    const getAllBlogsStub = this.stub(mongoBlogDao,"getAllBlogs");
    getAllBlogsStub.withArgs(req).returns(blogs);

    const blogFromDao = await blogService.getAllBlogs(req);
    expect(blogFromDao).toEqual(blogs)
    sinon.assert.calledOnce(getAllBlogsStub);
    sinon.assert.calledWithExactly(getAllBlogsStub,req);
}))

test("Testing Create Blog Method of Blog Service Class", sinontest(async function() {
    const createBlogStub = this.stub(mongoBlogDao,"createBlog");
    createBlogStub.returns(createdBlog);

    const blogFromDao = await blogService.createBlog(req);
    expect(blogFromDao).toEqual(blog)
    sinon.assert.calledOnce(createBlogStub);
    sinon.assert.calledWithExactly(createBlogStub,req);
}))
test("Testing delete Blog Method of Blog Service Class", sinontest(async function() {
    const deleteBlogStub = this.stub(mongoBlogDao,"deleteBlog");
    deleteBlogStub.withArgs(req).returns({});

    const blogFromDao = await blogService.deleteBlog(req);
    expect(blogFromDao).toEqual({})
    sinon.assert.calledOnce(deleteBlogStub);
    sinon.assert.calledWithExactly(deleteBlogStub,req);
}))
test("Testing delete Blog Method of Blog Service Class", sinontest(async function() {
    const updateBlogStub = this.stub(mongoBlogDao,"updateBlog");
    updateBlogStub.withArgs(req).returns(updatedBlog);

    const blogFromDao = await blogService.updateBlog(req);
    expect(blogFromDao).toEqual(updatedBlog)
    sinon.assert.calledOnce(updateBlogStub);
    sinon.assert.calledWithExactly(updateBlogStub,req);
}))