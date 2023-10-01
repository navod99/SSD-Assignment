const router = require("express").Router();
let Blog = require("../modal/blogSchema");

//Add Blogs

router.route("/add").post((req,res) => {

    const title = req.body.title;
    const name = req.body.name;
    const content = req.body.content;

    const newBlog = new Blog({

        title,
        name,
        content
    })

    newBlog.save().then(()=>{

        res.json("Blog Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//Get All Blogs

router.route("/").get((req,res)=>{

    Blog.find().then((blogs)=>{
        res.json(blogs)
    }).catch((err)=>{
        console.log(err);
    })
})

//Get By id

router.route("/get/:id").get(async(req,res) =>{
    let id = req.params.id;
    await Blog.findById(id).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        console.log(500);
    })
})
/*
//update blogs
 router.route("/update").put(async(req,res)=>{
    let id = req.params.id;
    const {title, content} = req.body;

    const updateBlog = {
        title,
        content
    }
    const update = await Blog.findByIdAndUpdate(id, updateBlog).then(()=>{
        res.status(200).send({status: "Blog Updated"})
    }).catch((err)=>{
        console.log(err);
    })
    
 })
*/

router.route("/update").put(async (req,res) => {
    const newBlog = req.body.newBlog
    const id = req.body.id
    console.log(newBlog, id);

    try {
        await Blog.findById(id, (error,  UpdateBlog) => {
            UpdateBlog.content = newBlog;
            UpdateBlog.save();
        });
    } catch (err) {
        console.log(err);
    }
    res.send("Updated");
})


//Delete Blog

router.route("/delete/:id").delete(async (req,res) => {

    let id = req.params.id;

    await Blog.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status:"Blog Deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error With Deleting Blog"})
    })
})


module.exports = router;