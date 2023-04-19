class BlogDto {
    constructor(blog) {
        const blogDto = JSON.parse(JSON.stringify(blog));
        this.author = blogDto.author;
        this.blogDescription = blogDto.blogDescription;
        this.blogHeadline = blogDto.blogHeadline;
        this.createdAt = blogDto.createdAt;
        this.updatedAt = blogDto.updatedAt;
        this.id = blogDto._id;
    }
}

module.exports = {BlogDto}