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

jest.mock("../../node_modules/express-negotiate/index",() => {
    return blog
})
const options = {
  body: {
    username: "someone",
    blogHeadline: "some Headline",
    blogDescription: "some Blog",
  },
  headers: {
      accept : "application/json" ,
  },
  negotiate : function(){return dorkari}
}

const blogs = [
  {
    username: "someone",
    blogHeadline: "some Headline",
    blogDescription: "some Blog",
  },
];
const createdBlog = {
  username: "someone",
  blogHeadline: "some Headline",
  blogDescription: "some Blog",
};
const updatedBlog = {
  username: "someone 2",
  blogHeadline: "some Headline 2 ",
  blogDescription: "some Blog 2",
};

test(
  "Testing Get Blog Method of Blog Service Class",
  sinontest(async function () {
    const req = mockRequest(options);
    const getBlogStub = this.stub(blogService,"getBlog");
    getBlogStub.returns(blog);
    const somethingStub = this.stub(contentNegotiation,"sendBlogResponse").returns(blog)

    const res = await blogController.getBlog(req);
    expect(res).toEqual(blog)
    //expect(blogService.getBlog()).toEqual(blog);
    //expect(req.negotiate).toEqual('success');
  })
);
test(
  "Testing Get Blog Method of Blog Service Class 2",
  sinontest(async function () {
    const req = mockRequest(options);
    const getBlogStub = this.stub(blogService,"getBlog");
    getBlogStub.returns("hello");
    const somethingStub = this.stub(contentNegotiation,"sendBlogResponse").returns(new Error("hello"))

    const res = await blogController.getBlog(req);
    expect(res).toEqual(Error("hello"))
    //expect(blogService.getBlog()).toEqual(blog);
    //expect(req.negotiate).toEqual('success');
  })
);
