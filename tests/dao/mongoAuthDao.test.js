const  MongoUser = require("../../models/userModel");
const {MongoAuthDao} = require("../../dao/auth/mongoAuthDao");
const {mockRequest, mockResponse } = require("mock-req-res");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const sinontest = sinonTest(sinon);
const mongoAuthDao = new MongoAuthDao();

const options = {
    body : {
        username : "someone12" ,
        name: "someone",
        email: "someonealso@mail.com",
    },
    params: {
        id: "123"
    }
}
const user = {
    username : "someone12" ,
    name: "someone",
    email: "someone@mail.com",
}


test("Testing signup Method of mongoAuthDao Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const {email,username} = req.body;
    const findOneStub = this.stub(MongoUser,"findOne").returns(null);
    const createStub = this.stub(MongoUser,"create").returns(user);

    const userFromDao = await mongoAuthDao.signupUser(req,res);

    expect(userFromDao).toEqual(user);
    sinon.assert.calledTwice(findOneStub);
    sinon.assert.calledOnce(createStub);
    sinon.assert.calledWithExactly(findOneStub,{email})
    sinon.assert.calledWithExactly(findOneStub,{username})
}))

/*
test("Testing signin Method of mongoAuthDao Class ", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const {email,username} = req.body;
    const findOneStub = this.stub(MongoUser,"findOne").returns({
        select: sinon.stub().returns(MongoUser.prototype.user)
    })
    const someStub = this.stub(MongoUser.prototype,"matchPasswords").returns(true);
    

    const  userFromDao = await mongoAuthDao.signinUser(req,res);

    expect( userFromDao).toEqual(MongoUser.prototype.user)
     
    

    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledWithExactly(findOneStub,{email});
}))
*/
