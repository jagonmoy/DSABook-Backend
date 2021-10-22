class BlogDto {
    constructor(blogs) {
        const something = JSON.parse(JSON.stringify(blogs));
        this.userName = something.userName;
        this.blogDescription = something.blogDescription;
        this.blogHeadline = something.blogHeadline;
        this.createdAt = something.createdAt;
    }
    getBlogs(){
        return this;
    }
}

module.exports = {BlogDto}