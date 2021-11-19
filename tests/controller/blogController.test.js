const sinon = require("sinon");
const sinonTest = require("sinon-test");
const { mockRequest, mockResponse } = require("mock-req-res");
const sinontest = sinonTest(sinon);
const contentNegotiation = require("../../utils/contentNegotiation")
const blogController = require("../../controller/blogController");

const blogService = blogController.blogService;

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
   "Testing getBlog Method of blogController When There is No Error",
   sinontest(async function () {
     const req = mockRequest(options); 
     const res = mockResponse();
     const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(blog);
     const getBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns(blog); 
     const result = await blogController.getBlog(req,res);  

     expect(result).toEqual(blog)
     sinon.assert.calledOnce(getBlogFromServiceStub);
     sinon.assert.calledOnce(getBlogFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
     sinon.assert.calledWithExactly(getBlogFromContentNegotiationStub,200,blog,req,res); 
   })
 );
 test(
   "Testing getBlog Method of blogController When There is Error",
   sinontest(async function () {
     const req = mockRequest(options);
     const res = mockResponse(); 
     const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(Promise.reject(new Error("Random")));
     const getBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error") 
     const result = await blogController.getBlog(req,res); 

     expect(result).toEqual("Error") 
     sinon.assert.calledOnce(getBlogFromServiceStub);
     sinon.assert.calledOnce(getBlogFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
     sinon.assert.calledWithExactly(getBlogFromContentNegotiationStub,404,"Random",req,res);
   })
 ); 
 
 test(
   "Testing getAllBlogs Method of blogController When There is No Error",
   sinontest(async function () {
     const req = mockRequest(options);
     const res = mockResponse();
     
     const getAllBlogsFromServiceStub = this.stub(blogService,"getAllBlogs").returns(blog);
     const getAllBlogsFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns(blog) 
     const result = await blogController.getAllBlogs(req,res);

     expect(result).toEqual(blog)
     sinon.assert.calledOnce(getAllBlogsFromServiceStub);
     sinon.assert.calledOnce(getAllBlogsFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getAllBlogsFromServiceStub,req);
     sinon.assert.calledWithExactly(getAllBlogsFromContentNegotiationStub,200,blog,req,res); 
   })
 );
test(
  "Testing getAllBlogs Method of blogController When There is Error",
  sinontest(async function () {
    const req = mockRequest(options);
    const res = mockResponse();
    const getAllBlogsFromServiceStub = this.stub(blogService,"getAllBlogs").returns(Promise.reject(new Error("Random")));
    const getAllBlogsFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error")

    const result = await blogController.getAllBlogs(req,res);
    
    expect(result).toEqual("Error")
    sinon.assert.calledOnce(getAllBlogsFromServiceStub);
    sinon.assert.calledOnce(getAllBlogsFromContentNegotiationStub);
    sinon.assert.calledWithExactly(getAllBlogsFromServiceStub,req);
    sinon.assert.calledWithExactly(getAllBlogsFromContentNegotiationStub,404,"Random",req,res);
  })
);
test(
  "Testing createBlog Method of blogController When There is No Error",
  sinontest(async function () {
    const req = mockRequest(options);
    const res = mockResponse();
    
    const createBlogFromServiceStub = this.stub(blogService,"createBlog").returns(blog);
    const createBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns(blog) 
    const result = await blogController.createBlog(req,res);

    expect(result).toEqual(blog)
    sinon.assert.calledOnce(createBlogFromServiceStub);
    sinon.assert.calledOnce(createBlogFromContentNegotiationStub);
    sinon.assert.calledWithExactly(createBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(createBlogFromContentNegotiationStub,201,blog,req,res); 
  })
);
test(
 "Testing createBlog Method of blogController When There is Error",
 sinontest(async function () {
   const req = mockRequest(options);
   const res = mockResponse();
   const createBlogFromServiceStub = this.stub(blogService,"createBlog").returns(Promise.reject(new Error("Random")));
   const createBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error")

   const result = await blogController.createBlog(req,res);
   
   expect(result).toEqual("Error")
   sinon.assert.calledOnce(createBlogFromServiceStub);
   sinon.assert.calledOnce(createBlogFromContentNegotiationStub);
   sinon.assert.calledWithExactly(createBlogFromServiceStub,req);
   sinon.assert.calledWithExactly(createBlogFromContentNegotiationStub,404,"Blog Creation Unsuccessful",req,res);
 })
);
test(
  "Testing updateBlog Method of blogController When There is No Error",
  sinontest(async function () {
    const req = mockRequest(options);
    const res = mockResponse();
    
    const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(blog);
    const updateBlogFromServiceStub = this.stub(blogService,"updateBlog").returns(blog);
    const updateBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns(blog) 

    const result = await blogController.updateBlog(req,res);

    expect(result).toEqual(blog)
    sinon.assert.calledOnce(getBlogFromServiceStub);
    sinon.assert.calledOnce(updateBlogFromServiceStub);
    sinon.assert.calledOnce(updateBlogFromContentNegotiationStub);
    sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(updateBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(updateBlogFromContentNegotiationStub,200,blog,req,res); 

  })
);

test(
 "Testing updateBlog Method of blogController When There is Error in getblog method of blogService class",
 sinontest(async function () {
   const req = mockRequest(options);
   const res = mockResponse();
   
   const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(Promise.reject(new Error("Random")));
   const updateBlogFromServiceStub = this.stub(blogService,"updateBlog").returns(blog);
   const updateBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error")


   const result = await blogController.updateBlog(req,res);
   
   expect(result).toEqual("Error")
   sinon.assert.calledOnce(getBlogFromServiceStub);
   expect(updateBlogFromServiceStub.calledOnce).toBeFalsy();
   sinon.assert.calledOnce(updateBlogFromContentNegotiationStub);
   sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
   sinon.assert.calledWithExactly(updateBlogFromContentNegotiationStub,404,"Random",req,res);
 })
);

test(
  "Testing updateBlog Method of blogController When There is Error in update blog method of blogService class",
  sinontest(async function () {
    const req = mockRequest(options);
    const res = mockResponse();
    
    const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(blog);
    const updateBlogFromServiceStub = this.stub(blogService,"updateBlog").returns(Promise.reject(new Error("Random")));
    const updateBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error")
 
 
    const result = await blogController.updateBlog(req,res);
    
    expect(result).toEqual("Error")
    sinon.assert.calledOnce(getBlogFromServiceStub);
    sinon.assert.calledOnce(updateBlogFromServiceStub);
    sinon.assert.calledOnce(updateBlogFromContentNegotiationStub);
    sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(updateBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(updateBlogFromContentNegotiationStub,404,"Random",req,res);
  })
 );

test(
  "Testing deleteBlog Method of blogController When There is No Error",
  sinontest(async function () {
    const req = mockRequest(options);
    const res = mockResponse();
    
    const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(blog);
    const deleteBlogFromServiceStub = this.stub(blogService,"deleteBlog").returns(blog);
    const deleteBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns(blog) 

    const result = await blogController.deleteBlog(req,res);

    expect(result).toEqual(blog)
    sinon.assert.calledOnce(getBlogFromServiceStub);
    sinon.assert.calledOnce(deleteBlogFromServiceStub);
    sinon.assert.calledOnce(deleteBlogFromContentNegotiationStub);
    sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(deleteBlogFromServiceStub,req);
    sinon.assert.calledWithExactly(deleteBlogFromContentNegotiationStub,200,"Blog Deleted",req,res); 

  })
);

test(
 "Testing deleteBlog Method of blogController When There is Error in getblog method of blogService class",
 sinontest(async function () {
   const req = mockRequest(options);
   const res = mockResponse();
   
   const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(Promise.reject(new Error("Random")));
   const deleteBlogFromServiceStub = this.stub(blogService,"deleteBlog").returns(blog);
   const deleteBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error")


   const result = await blogController.deleteBlog(req,res);
   
   expect(result).toEqual("Error")
   sinon.assert.calledOnce(getBlogFromServiceStub);
   expect(deleteBlogFromServiceStub.calledOnce).toBeFalsy();
   sinon.assert.calledOnce(deleteBlogFromContentNegotiationStub);
   sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
   sinon.assert.calledWithExactly(deleteBlogFromContentNegotiationStub,404,"Random",req,res);
 })
);

test(
 "Testing deleteBlog Method of blogController When There is Error in updateblog method of blogService class",
 sinontest(async function () {
   const req = mockRequest(options);
   const res = mockResponse();
   
   const getBlogFromServiceStub = this.stub(blogService,"getBlog").returns(blog);
   const deleteBlogFromServiceStub = this.stub(blogService,"deleteBlog").returns(Promise.reject(new Error("Random")));
   const deleteBlogFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error")


   const result = await blogController.deleteBlog(req,res);

   expect(result).toEqual("Error")
   sinon.assert.calledOnce(getBlogFromServiceStub);
   sinon.assert.calledOnce(deleteBlogFromServiceStub);
   sinon.assert.calledOnce(deleteBlogFromContentNegotiationStub);
   sinon.assert.calledWithExactly(getBlogFromServiceStub,req);
   sinon.assert.calledWithExactly(deleteBlogFromServiceStub,req);
   sinon.assert.calledWithExactly(deleteBlogFromContentNegotiationStub,404,"Random",req,res);
 })
);



