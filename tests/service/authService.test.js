const {MongoAuthDao} = require("../../dao/auth/mongoAuthDao");
const {AuthService} = require("../../service/authService");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const sinontest = sinonTest(sinon);
const mongoAuthDao = new MongoAuthDao();
const authService = new AuthService(mongoAuthDao);

const req = {
    paramas : {
        id : 0
    }
}
const user = {
   name : "jagonmoy" ,
   username : "jagonmoy18" ,
   email : "jagonmoy@mail.com",
}


test("Testing signupUser Method of auth Service Class", sinontest(async function() {
   const signupUserStub = this.stub(mongoAuthDao,"signupUser");
   signupUserStub.returns(user);

   const authFromDao = await authService.signupUser(req);
   expect(authFromDao).toEqual(user)
   sinon.assert.calledOnce(signupUserStub);
   sinon.assert.calledWithExactly(signupUserStub,req);
}))
test("Testing signinUser Method of auth Service Class", sinontest(async function() {
    const signinUserStub = this.stub(mongoAuthDao,"signinUser");
    signinUserStub.returns(user);
 
    const authFromDao = await authService.signinUser(req);

    expect(authFromDao).toEqual(user)
    sinon.assert.calledOnce(signinUserStub);
    sinon.assert.calledWithExactly(signinUserStub,req);
 }))
 