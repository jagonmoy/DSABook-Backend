const {MongoUserDao} = require("../../dao/user/mongoUserDao");
const {UserService} = require("../../service/userService");
const sinon = require('sinon');
const sinonTest = require("sinon-test");
const sinontest = sinonTest(sinon);
const mongoUserDao = new MongoUserDao();
const userService = new UserService(mongoUserDao);

const req = {
     paramas : {
         id : 0
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


test("Testing getUser Method of User Service Class", sinontest(async function() {
    const getUserStub = this.stub(mongoUserDao,"getUser");
    getUserStub.returns(user);

    const userFromDao = await userService.getUser(req);
    expect(userFromDao).toEqual(user)
    sinon.assert.calledOnce(getUserStub);
    sinon.assert.calledWithExactly(getUserStub,req);
}))

test("Testing Get All Blogs Method of Blog Service Class", sinontest(async function() {
    const getAllUsersStub = this.stub(mongoUserDao,"getAllUsers");
    getAllUsersStub.returns(users);
    const userFromDao = await userService.getAllUsers(req);
    expect(userFromDao).toEqual(users)
    sinon.assert.calledOnce(getAllUsersStub);
    sinon.assert.calledWithExactly(getAllUsersStub,req);
}))
