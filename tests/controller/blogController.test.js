const sinon = require("sinon");
const sinonTest = require("sinon-test");
const { mockRequest, mockResponse } = require("mock-req-res");
const sinontest = sinonTest(sinon);
const contentNegotiation = require("../../utils/contentNegotiation")
const blogController = require("../../controller/blogController");

const blogService = blogController.blogService;
const { MongoBlogDao } = require("../../dao/blog/mongoBlogDao");
const { BlogService } = require("../../service/blogService");

const blog = {
    username: "someone",
    blogHeadline: "some Headline",
    blogDescription: "some Blog",
};

const options = {
  body: {
    username: "someone",
    blogHeadline: "some Headline",
    blogDescription: "some Blog",
  },
}


 test(
   "Testing Get Blog Method of Blog Service Class When There is No Error",
   sinontest(async function () {
     const req = mockRequest(options); 
     const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(blog);
     const getBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns(blog); 
     const result = await blogController.getBlog(req);  
     expect(result).toEqual(blog)
     sinon.assert.calledOnce(getBlogFromServiceStub);
     sinon.assert.calledOnce(getBlogFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
     sinon.assert.calledWithExactly(getBlogFromContentNegotiationStub,200,blog,req,undefined); 
   })
 );
 test(
   "Testing Get Blog Method of Blog Service Class When There is Error",
   sinontest(async function () {
     const req = mockRequest(options); 
     const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(Promise.reject(new Error("Random")));
     const getBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns("Error") 
     const result = await blogController.getBlog(req); 
     expect(result).toEqual("Error") 
     sinon.assert.calledOnce(getBlogFromServiceStub);
     sinon.assert.calledOnce(getBlogFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
     sinon.assert.calledWithExactly(getBlogFromContentNegotiationStub,404,"Random",req,undefined);
   })
 ); 
 test(
   "Testing Get All Blogs Method of Blog Service Class When There is No Error",
   sinontest(async function () {
     const req = mockRequest(options);
     
     const getAllBlogsFromServiceStub = this.stub(blogService,"getAllBlogs").returns(blog);
     const getAllBlogsFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns(blog) 
     const result = await blogController.getAllBlogs(req);
     expect(result).toEqual(blog)
     sinon.assert.calledOnce(getAllBlogsFromServiceStub);
     sinon.assert.calledOnce(getAllBlogsFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getAllBlogsFromServiceStub,req);
     sinon.assert.calledWithExactly(getAllBlogsFromContentNegotiationStub,200,blog,req,undefined); 
   })
 );
test(
  "Testing Get All Blogs Method of Blog Service Class When There is Error",
  sinontest(async function () {
    const req = mockRequest(options);
    const getAllBlogsFromServiceStub = this.stub(blogService,"getAllBlogs").returns(Promise.reject(new Error("Random")));
    const getAllBlogsFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns("Error")

    const result = await blogController.getAllBlogs(req);
    
    expect(result).toEqual("Error")
    sinon.assert.calledOnce(getAllBlogsFromServiceStub);
    sinon.assert.calledOnce(getAllBlogsFromContentNegotiationStub);
    sinon.assert.calledWithExactly(getAllBlogsFromServiceStub,req);
    sinon.assert.calledWithExactly(getAllBlogsFromContentNegotiationStub,404,"Random",req,undefined);
  })
);
test(
  "Testing create blog Method of Blog Service Class When There is No Error",
  sinontest(async function () {
    const req = mockRequest(options);
    
    const createBlogFromServiceStub = this.stub(blogService,"createBlog").returns(blog);
    const createBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns(blog) 
    const result = await blogController.createBlog(req);
    expect(result).toEqual(blog)
    sinon.assert.calledOnce(createBlogFromServiceStub);
    sinon.assert.calledOnce(createBlogFromContentNegotiationStub);
    sinon.assert.calledWithExactly(createBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(createBlogFromContentNegotiationStub,201,blog,req,undefined); 
  })
);
test(
 "Testing create blog Method of Blog Service Class When There is Error",
 sinontest(async function () {
   const req = mockRequest(options);
   const createBlogFromServiceStub = this.stub(blogService,"createBlog").returns(Promise.reject(new Error("Random")));
   const createBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns("Error")

   const result = await blogController.createBlog(req);
   
   expect(result).toEqual("Error")
   sinon.assert.calledOnce(createBlogFromServiceStub);
   sinon.assert.calledOnce(createBlogFromContentNegotiationStub);
   sinon.assert.calledWithExactly(createBlogFromServiceStub,req);
   sinon.assert.calledWithExactly(createBlogFromContentNegotiationStub,404,"Blog Creation Unsuccessful",req,undefined);
 })
);
test(
  "Testing update blog Method of Blog Service Class When There is No Error",
  sinontest(async function () {
    const req = mockRequest(options);
    
    const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(blog);
    const updateBlogFromServiceStub = this.stub(blogService,"updateBlog").returns(blog);
    const updateBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns(blog) 

    const result = await blogController.updateBlog(req);

    expect(result).toEqual(blog)
    sinon.assert.calledOnce(getBlogFromServiceStub);
    sinon.assert.calledOnce(updateBlogFromServiceStub);
    sinon.assert.calledOnce(updateBlogFromContentNegotiationStub);
    sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(updateBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(updateBlogFromContentNegotiationStub,200,blog,req,undefined); 

  })
);
test(
 "Testing update blog Method of Blog Service Class When There is Error",
 sinontest(async function () {
   const req = mockRequest(options);
   
   const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(Promise.reject(new Error("Random")));
   const updateBlogFromServiceStub = this.stub(blogService,"updateBlog").returns(blog);
   const updateBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns("Error")


   const result = await blogController.updateBlog(req);
   
   expect(result).toEqual("Error")
   sinon.assert.calledOnce(getBlogFromServiceStub);
   sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
   sinon.assert.calledWithExactly(updateBlogFromContentNegotiationStub,404,"Random",req,undefined);
 })
);

test(
  "Testing delete blog Method of Blog Service Class When There is No Error",
  sinontest(async function () {
    const req = mockRequest(options);
    
    const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(blog);
    const deleteBlogFromServiceStub = this.stub(blogService,"deleteBlog").returns(blog);
    const deleteBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns(blog) 

    const result = await blogController.deleteBlog(req);

    expect(result).toEqual(blog)
    sinon.assert.calledOnce(getBlogFromServiceStub);
    sinon.assert.calledOnce(deleteBlogFromServiceStub);
    sinon.assert.calledOnce(deleteBlogFromContentNegotiationStub);
    sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(deleteBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(deleteBlogFromContentNegotiationStub,200,"Blog Deleted",req,undefined); 

  })
);
test(
 "Testing delete blog Method of Blog Service Class When There is Error",
 sinontest(async function () {
   const req = mockRequest(options);
   
   const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(Promise.reject(new Error("Random")));
   const deleteBlogFromServiceStub = this.stub(blogService,"deleteBlog").returns(blog);
   const deleteBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendBlogResponse").returns("Error")


   const result = await blogController.deleteBlog(req);
   
   expect(result).toEqual("Error")
   sinon.assert.calledOnce(getBlogFromServiceStub);
   sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
   sinon.assert.calledWithExactly(deleteBlogFromContentNegotiationStub,404,"Random",req,undefined);
 })
);



