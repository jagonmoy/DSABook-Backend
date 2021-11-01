const supertest = require('supertest');

describe("testing Anything",() => {
    test("Should return true", () => {
        expect(true).toBe(true);
    })
})

describe("Get a Blog",() => {
     it("if Blog ID Doesn't Exist should Return a Error", async () => {
          const blogID = 'khshs1253456';
          await supertest().get(`/api/blogs/${blogID}`)
     })
})