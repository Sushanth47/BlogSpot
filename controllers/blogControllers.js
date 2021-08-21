// blog_index, blog_detailes, blog_create_get, blog_create_post, blog_delete
const Blog = require('../models/blog');


const blog_index = async (req, res) => {
   var result =await Blog.find().sort({ createdAt: -1});
    return res.render('blogs/index', { title: 'All Blogs', blogs: result})  
}

const blog_details = async (req, res) =>{
    const id = req.params.id;
    var blogFind = await Blog.findById(id)
    if(blogFind){
    return res.render('blogs/details', { blog: blogFind, title: 'Blog Details' })
    }else{
    res.status(404).render('404', {title: 'Blog not found'})
    }
    
}

const blog_create_get = async (req, res) =>{
    return res.render('blogs/create', { title: 'Create a new Blog' });
}

const blog_create_post = async (req, res) => {
    const blog = new Blog(req.body);

  await blog.save()
   return res.redirect('/blogs');
   
}

const blog_delete = async (req, res) =>{
    const id = req.params.id;

   await Blog.findByIdAndDelete(id)

   return res.json({ redirect: '/blogs' })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}
