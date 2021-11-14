var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

function getAllPosts() {
    var defer = q.defer();

    var query = conn.query('SELECT p.id,p.title,p.content,p.author,p.phone,p.image,p.image1,p.price,p.area,users.last_name FROM posts p JOIN users ON p.id_user=users.id', function(err, posts) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(posts);
        }
    });

    return defer.promise;
}

function addPost(params) {
    if (params) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO posts SET ?', params, function(err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    return false;
}

function getPostByID(id) {
    var defer = q.defer();

    var query = conn.query('SELECT * FROM posts WHERE ?', { id: id }, function(err, posts) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(posts);
        }
    });

    return defer.promise;
}

function updatePost(params) {
    if (params) {
        var defer = q.defer();

        var query = conn.query('UPDATE posts SET title = ?, content = ?, author = ?,phone = ?, image = ?,image1 = ?, price =?, area =? WHERE id =?', [params.title, params.content, params.author, params.phone, params.image, params.image1, params.price, params.area, params.id], function(err, result) {


            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    return false;
}

function deletePost(id) {
    if (id) {
        var defer = q.defer();

        var query = conn.query('DELETE FROM posts WHERE id = ?', [id], function(err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;

    }

    return false;
}



module.exports = {
    getAllPosts: getAllPosts,
    addPost: addPost,
    getPostByID: getPostByID,
    updatePost: updatePost,
    deletePost: deletePost
}