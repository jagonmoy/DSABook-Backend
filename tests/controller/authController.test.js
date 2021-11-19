const sinon = require("sinon");
const sinonTest = require("sinon-test");
const { mockRequest, mockResponse } = require("mock-req-res");
const sinontest = sinonTest(sinon);
const contentNegotiation = require("../../utils/contentNegotiation")
const authController = require("../../controller/authController");
const sendJWTToken = require("../../utils/sendJWTToken");
const authService = authController.authService;

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
const token = "token" ;
const cookieOptions = "cookieOptions";

 test(
   "Testing signup Method of authController When There is No Error",
   sinontest(async function () {
     const req = mockRequest(options); 
     const res = mockResponse();
     const signupFromServiceStub = this.stub(authService,"signupUser").returns(user);
     const signupFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns(user); 
     const result = await authController.signup(req,res);  
    
     expect(result).toEqual(user)
     sinon.assert.calledOnce(signupFromServiceStub);
     sinon.assert.calledOnce(signupFromContentNegotiationStub);
     sinon.assert.calledWithExactly(signupFromServiceStub,req);
     sinon.assert.calledWithExactly(signupFromContentNegotiationStub,200,user,req,res); 
   })
 );
 test(
    "Testing signup Method of authController When There is Error",
    sinontest(async function () {
      const req = mockRequest(options); 
      const res = mockResponse();
      const signupFromServiceStub = this.stub(authService,"signupUser").returns(Promise.reject(new Error("Random")));
      const signupFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error"); 
      const result = await authController.signup(req,res);  
     
      expect(result).toEqual("Error")
      sinon.assert.calledOnce(signupFromServiceStub);
      sinon.assert.calledOnce(signupFromContentNegotiationStub);
      sinon.assert.calledWithExactly(signupFromServiceStub,req);
      sinon.assert.calledWithExactly(signupFromContentNegotiationStub,403,"Random",req,res); 
    })
  );
  test(
    "Testing signin Method of authController When There is No Error",
    sinontest(async function () {
      const req = mockRequest(options); 
      const res = mockResponse();
      const signinFromServiceStub = this.stub(authService,"signinUser").returns(user);
      const sendJWTTokenStub = this.stub(sendJWTToken,"sendToken").returns({token,cookieOptions})
      const signinFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns(user); 
      const result = await authController.signin(req,res);  
     
      expect(result).toEqual(user)
      sinon.assert.calledOnce(signinFromServiceStub);
      sinon.assert.calledOnce(sendJWTTokenStub);
      sinon.assert.calledOnce(signinFromContentNegotiationStub);
      sinon.assert.calledWithExactly(signinFromServiceStub,req);
      sinon.assert.calledWithExactly(sendJWTTokenStub,user.username);
      sinon.assert.calledWithExactly(signinFromContentNegotiationStub,200,"Signed in Successfully",req,res); 
    })
  );
  test(
    "Testing signin Method of authController When There is Error",
    sinontest(async function () {
      const req = mockRequest(options); 
      const res = mockResponse();
      const signinFromServiceStub = this.stub(authService,"signinUser").returns(Promise.reject(new Error("Random")));
      const sendJWTTokenStub = this.stub(sendJWTToken,"sendToken").returns({token,cookieOptions})
      const signinFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns("Error"); 
      const result = await authController.signin(req,res);  
     
      expect(result).toEqual("Error")
      sinon.assert.calledOnce(signinFromServiceStub);
      expect(sendJWTTokenStub.calledOnce).toBeFalsy();
      sinon.assert.calledOnce(signinFromContentNegotiationStub);
      sinon.assert.calledWithExactly(signinFromServiceStub,req);
      sinon.assert.calledWithExactly(signinFromContentNegotiationStub,401,"Random",req,res); 
    })
  );
  test(
    "Testing signout Method of authController",
    sinontest(async function () {
      const req = mockRequest(options); 
      const res = mockResponse();
      const signoutFromContentNegotiationStub = this.stub(contentNegotiation,"sendResponse").returns(user); 
      const result = await authController.signout(req,res);  
     
      expect(result).toEqual(user)
      sinon.assert.calledOnce(signoutFromContentNegotiationStub);
      sinon.assert.calledWithExactly(signoutFromContentNegotiationStub,200,"Signed Out Successfully!",req,res); 
    })
  );
 