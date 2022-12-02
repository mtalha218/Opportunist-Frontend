export const blog = () => "/blog/post";

export const allBlog = () => "/blog/all";

export const getMyBlogs = (id) => `/blog/mine`;
export const getBlogByID = (id) => `/blog/${id}`;
export const editBlogByID = (id) => `/blog/${id}`;
export const deleteBlogByID = (id) => `/blog/${id}`;
export const review = () => "/blog/review";
export const like = (blogId) => `/blog/like/${blogId}`;
