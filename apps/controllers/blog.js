var express = require("express");
var router = express.Router();
var db = require("../common/database");
var post_md = require("../modles/post");
var contact_md = require('../modles/contact');



router.get("/", function(req, res) {
    // res.json({"message": "This is Blog Page"});

    var data = post_md.getAllPosts();

    data.then(function(posts) {
        var result = {
            posts: posts,
            error: false
        };

        res.render("blog/index", { data: result });
    }).catch(function(err) {
        var result = {
            error: "Could not get posts data"
        };

        res.render("blog/index", { data: result });
    });

    // res.render("blog/index");
});

router.get("/blog/post/:id", function(req, res) {
    var data = post_md.getPostByID(req.params.id);

    data.then(function(posts) {
        var post = posts[0];

        var result = {
            post: post,
            error: false
        };

        res.render("blog/post", { data: result });
    }).catch(function(err) {
        var result = {
            error: "Could not get post detail"
        };

        res.render("blog/post", { data: result });
    });
});

router.get("/blog/about", function(req, res) {
    res.render("blog/about");
});





router.get("/contact", function(req, res) {
    res.render("blog/contact");
});
var conn = db.getConnection();
router.post("/contact/post", function(req, res) {
    let contact = {
        fullname: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        tieude: req.body.title,
        noidung: req.body.description
    };
    let sql = 'INSERT INTO contact SET ?';
    let query = conn.query(sql, contact, (err, results) => {
        if (err) throw err;
        res.redirect('/contact');

    });
});


module.exports = router;