const  MongoBlog = require("../../models/userModel");
const {MongoUserDao} = require("../../dao/user/mongoUserDao");
const {mockRequest} = require("mock-req-res");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const sinontest = sinonTest(sinon);
const mongoUserDao = new MongoUserDao();

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
const users = [
    {
    username : "someone12" ,
    name: "someone",
    email: "someone@mail.com"
    }
]


test("Testing getAllUsers Method of mongoUserDao Class", sinontest(async function() {
    const req = mockRequest(options);
    const getAllUsersStub = this.stub(MongoBlog,"find").returns(users);

    const userFromDao = await mongoUserDao.getAllUsers(req);

    expect(userFromDao).toEqual(users);
    sinon.assert.calledOnce(getAllUsersStub);
    sinon.assert.calledWithExactly(getAllUsersStub,req.body);
   
}))
test("Testing getUser Method of mongoUserDao Class", sinontest(async function() {
    const req = mockRequest(options);
    const getUserStub = this.stub(MongoBlog,"findOne").returns(user);
    const username = req.body.username;
    const userFromDao = await mongoUserDao.getUser(username)

    expect(userFromDao).toEqual(user);
    sinon.assert.calledOnce(getUserStub);
    sinon.assert.calledWithExactly(getUserStub,{username});
   
}))
