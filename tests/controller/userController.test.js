const sinon = require("sinon");
const sinonTest = require("sinon-test");
const { mockRequest, mockResponse } = require("mock-req-res");
const sinontest = sinonTest(sinon);
const contentNegotiation = require("../../utils/contentNegotiation")
const userController = require("../../controller/userController");

const userService = userController.userService;

const user = {
    username: "someone12",
    name : "someone name",
    email: "someone@mail.com",
};

const options = {
  body: {
    username: "someone12",
    name : "someone name",
    email: "someone@mail.com",
  },
  params: {
      username: "someone12"
  }
}


 test(
   "Testing getUser Method of userController When There is No Error",
   sinontest(async function () {
     const req = mockRequest(options);
     const res = mockResponse(); 
     const getUserFromServiceStub = this.stub(userService,"getUser").returns(user);
     const getUserFromContentNegotiationStub = this.stub(contentNegotiation,"sendUserResponse").returns(user); 
     const result = await userController.getUser(req,res);  
    
     expect(result).toEqual(user)
     sinon.assert.calledOnce(getUserFromServiceStub);
     sinon.assert.calledOnce(getUserFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getUserFromServiceStub,req.params.username);
     sinon.assert.calledWithExactly(getUserFromContentNegotiationStub,200,user,req,res); 
   })
 );
 
 test(
   "Testing getUser Method of userController When There is Error",
   sinontest(async function () {
     const req = mockRequest(options);
     const res = mockResponse(); 
     const getUserFromServiceStub = this.stub(userService,"getUser").returns(Promise.reject(new Error("Random")));
     const getUserFromContentNegotiationStub = this.stub(contentNegotiation,"sendUserResponse").returns("Error") 
     const result = await userController.getUser(req,res); 

     expect(result).toEqual("Error") 
     sinon.assert.calledOnce(getUserFromServiceStub);
     sinon.assert.calledOnce(getUserFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getUserFromServiceStub,req.params.username);
     sinon.assert.calledWithExactly(getUserFromContentNegotiationStub,404,"Random",req,res);
   })
 ); 
 
 test(
   "Testing getAllUsers Method of userController When There is No Error",
   sinontest(async function () {
     const req = mockRequest(options);
     const res = mockResponse();
     
     const getAllUsersFromServiceStub = this.stub(userService,"getAllUsers").returns(user);
     const getAllUsersFromContentNegotiationStub = this.stub(contentNegotiation,"sendUserResponse").returns(user) 
     const result = await userController.getAllUsers(req,res);

     expect(result).toEqual(user)
     sinon.assert.calledOnce(getAllUsersFromServiceStub);
     sinon.assert.calledOnce(getAllUsersFromContentNegotiationStub);
     sinon.assert.calledWithExactly(getAllUsersFromServiceStub,req);
     sinon.assert.calledWithExactly(getAllUsersFromContentNegotiationStub,200,user,req,res); 
   })
 );

test(
  "Testing getAllUsers Method of userController When There is Error",
  sinontest(async function () {
    const req = mockRequest(options);
    const res = mockResponse();
    const getAllUsersFromServiceStub = this.stub(userService,"getAllUsers").returns(Promise.reject(new Error("Random")));
    const getAllUsersFromContentNegotiationStub = this.stub(contentNegotiation,"sendUserResponse").returns("Error")

    const result = await userController.getAllUsers(req,res);
    
    expect(result).toEqual("Error")
    sinon.assert.calledOnce(getAllUsersFromServiceStub);
    sinon.assert.calledOnce(getAllUsersFromContentNegotiationStub);
    sinon.assert.calledWithExactly(getAllUsersFromServiceStub,req);
    sinon.assert.calledWithExactly(getAllUsersFromContentNegotiationStub,404,"Random",req,res);
  })
);
