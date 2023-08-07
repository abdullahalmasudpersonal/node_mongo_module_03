let blogs = [
    { id: 1, name: 'abdullah' },
    { id: 2, name: 'masud' },
    { id: 3, name: 'mahmud' },
    { id: 4, name: 'hafiz' }
];

module.exports.getAlltools = (req, res, next) => {
    const { limit, page } = req.query;
    console.log(limit, page)
    res.json(blogs.slice(0, limit));
    //  next();
};

module.exports.saveATools = (req, res) => {
    console.log(req.query);
    blogs.push(req.body);
    res.send(blogs);
};

module.exports.getBlogsDetail = (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const foundBlogs = blogs.find(blog => blog.id === Number(id))
    res.send(foundBlogs);
    res.status(200).send({
        success: true,
        message: "Success",
        data: blogs
    });
    res.status(500).send({
        success:false,
        error:"Internal Server Error."
    });
};

module.exports.updateBlogs = (req, res) => {
    //  const newData = req.body;
    const { id } = req.params;
    const filter = { _id: id };

    const newData = blogs.find(blog => blog.id === Number(id));

    newData.id = id;
    newData.name = req.body.name;
    res.send(newData);
}

module.exports.deleteBlogs=(req,res )=>{
    const {id} = req.params;
    const filter = {_id: id};

    blogs = blogs.filter(blog => blog.id !== Number(id));

    res.send(blogs);
}
