var db = require("../common/database");
var q = require('q');

var conn = db.getConnection();

function addcontact(user) {

    if (contact) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO contact SET ?', contact, function(err, result) {
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



function getcontactByEmail(email) {
    if (email) {
        var defer = q.defer();

        var query = conn.query('SELECT * FROM contact  WHERE ?', { email: email }, function(err, result) {
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

function getAllContact() {
    var defer = q.defer();

    var query = conn.query('SELECT * FROM contact', function(err, contact) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(contact);
        }
    });

    return defer.promise;
}

function deleteContact(id) {
    if (id) {
        var defer = q.defer();

        var query = conn.query('DELETE FROM contact WHERE id = ?', [id], function(err, result) {
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
    getcontactByEmail: getcontactByEmail,
    getAllContact: getAllContact,
    addcontact: addcontact,
    deleteContact: deleteContact,
}