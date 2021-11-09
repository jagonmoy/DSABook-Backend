const {MongoUserDao} = require("../../dao/user/mongoUserDao");
const {UserService} = require("../../service/userService");
const { mockRequest, mockResponse } = require("mock-req-res");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const sinontest = sinonTest(sinon);
const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

const options = {
    body: {
        username : "someone" ,
        username : "jagonmoy18" ,
        email : "jagonmoy@mail.com",
    }
}
const user = {
    username : "someone" ,
    username : "jagonmoy18" ,
    email : "jagonmoy@mail.com",
}
const users = [
    {
    username : "someone" ,
    username : "jagonmoy18" ,
    email : "jagonmoy@mail.com",
    }
]


test("Testing getUser Method of UserService Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const getUserStub = this.stub(mongoUserDao,"getUser").returns(user);

    const userFromDao = await userService.getUser(req,res);

    expect(userFromDao).toEqual(user)
    sinon.assert.calledOnce(getUserStub);
    sinon.assert.calledWithExactly(getUserStub,req);
}))

test("Testing getAllUsers Method of UserService Class", sinontest(async function() {
    const req = mockRequest(options);
    const res = mockResponse();
    const getAllUsersStub = this.stub(mongoUserDao,"getAllUsers").returns(users);

    const userFromDao = await userService.getAllUsers(req,res);

    expect(userFromDao).toEqual(users)
    sinon.assert.calledOnce(getAllUsersStub);
    sinon.assert.calledWithExactly(getAllUsersStub,req);
}))
