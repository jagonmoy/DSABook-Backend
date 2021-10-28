class BlogDto {
    constructor(blog) {
        const blogDto = JSON.parse(JSON.stringify(blog));
        this.username = blogDto.username;
        this.blogDescription = blogDto.blogDescription;
        this.blogHeadline = blogDto.blogHeadline;
        this.createdAt = blogDto.createdAt;
        this.id = blogDto._id;
    }
}

module.exports = {BlogDto}