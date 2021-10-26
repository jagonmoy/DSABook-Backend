class BlogDto {
    constructor(blog) {
        let blogDto = JSON.parse(JSON.stringify(blog));
        this.userName = blogDto.userName;
        this.blogDescription = blogDto.blogDescription;
        this.blogHeadline = blogDto.blogHeadline;
        this.createdAt = blogDto.createdAt;
        this.id = blogDto._id;
    }
}

module.exports = {BlogDto}