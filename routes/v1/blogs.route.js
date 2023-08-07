const express = require('express');
const { getAlltools, saveATools, getBlogsDetail, updateBlogs, deleteBlogs } = require('../../controllars/blogs.controllar');
const viewCount = require('../../middleWare/viewCount');
const { limiter } = require('../../middleWare/limiter');

const router = express.Router();

// router.get("/:id", (req, res) => {
//     res.send("blogs founds of ides");
// });

// router.post("/blogs", (req, res) => {
//     res.send('blogs added');
// });

router
    .route("/")

    .get(getAlltools)

    .post(saveATools);

router
.route('/:id')
.get(viewCount,/* limiter, */ getBlogsDetail)
.patch(updateBlogs)
.delete(deleteBlogs)


module.exports = router;