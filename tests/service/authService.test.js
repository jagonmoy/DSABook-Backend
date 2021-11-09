const {MongoAuthDao} = require("../../dao/auth/mongoAuthDao");
const {AuthService} = require("../../service/authService");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const { mockRequest, mockResponse } = require("mock-req-res");
const sinontest = sinonTest(sinon);
const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

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

test("Testing signupUser Method of AuthService Class", sinontest(async function() {
   const req = mockRequest(options);
   const res = mockResponse();
   const signupUserStub = this.stub(mongoAuthDao,"signupUser").returns(user);
  
   const authFromDao = await authService.signupUser(req,res);

   expect(authFromDao).toEqual(user);
   sinon.assert.calledOnce(signupUserStub);
   sinon.assert.calledWithExactly(signupUserStub,req);
}))
test("Testing signinUser Method of AuthService Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const signinUserStub = this.stub(mongoAuthDao,"signinUser").returns(user);
 
    const authFromDao = await authService.signinUser(req,res);

    expect(authFromDao).toEqual(user)
    sinon.assert.calledOnce(signinUserStub);
    sinon.assert.calledWithExactly(signinUserStub,req);
 }))
 