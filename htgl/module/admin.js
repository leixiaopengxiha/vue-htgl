// 学生管理模块 admin表
// 引入mongodb.js
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
// 登录
exports.login = (data, callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbo = db.db("htgl");
        dbo.collection("login").find(data).toArray((err, result) => {
            if (err) throw err;
            callback(result)
            db.close();
        })
    })
}
// 获取用户信息
exports.findBiao = (data, callback) => {

    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbo = db.db("htgl");
        dbo.collection("information").find(data).toArray((err, result) => {
            if (err) throw err;
            callback(result)
            db.close();
        })
    })
}

// 添加学生信息
exports.addLists = (data, callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbase = db.db("htgl");
        dbase.collection('student').insertOne({
            data
        }, function (err, res) {
            if (err) throw err;
            callback(res)
            // 关闭数据库
            db.close();
        });
    });
}

// 获取所有学生信息
exports.getAllstudent = (body, callback) => {
    let idx = body.idx || 1;
    let date = body.data || {}
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        // console.log(body);
        dbo.collection('student').find(date).toArray((err, result) => {
            if (err) throw err;
            selcetFn(Math.ceil(result.length / 20))
        });
        let selcetFn = (total) => {

            if (idx != 1 && idx > total) {
                idx = total
            }
            dbo.collection('student').find(date).skip((idx - 1) * 20).limit(20).toArray((err, result) => {
                if (err) throw err;

                callback({
                    result,
                    total,
                })
                db.close();
            });
        }
    })
}

// 修改学生信息
exports.UpdataStudent = (whereStr, updateStr, callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('student').updateOne({
            _id: ObjectId(whereStr)
        }, {
            $set: {
                data: updateStr
            }
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            db.close();
        })
    })
}

// 删除学生信息
exports.DeleteStudentOne = (id, callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('student').deleteMany({
            _id: ObjectId(id)
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            db.close();
        })
    })
}

// 添加教师信息
exports.addteachers = (data, callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbase = db.db("htgl");

        dbase.collection('teacher').insertOne({
            data
        }, function (err, res) {
            if (err) throw err;
            callback(res)
            // 关闭数据库
            db.close();
        });
    });
}
// getTeacher


// 获取所有班主任信息
exports.getTeacher = (body, callback) => {
    let idx = body.idx || 1;
    let date = body.data || {}
    // console.log(idx, date);
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('teacher').find(date).toArray((err, result) => {
            if (err) throw err;
            selcetFns(Math.ceil(result.length / 20))
        });
        let selcetFns = (total) => {
            if (idx != 1 && idx > total) {
                idx = total
            }
            dbo.collection('teacher').find(date).skip((idx - 1) * 20).limit(20).toArray((err, result) => {
                if (err) throw err;
                callback({
                    result,
                    total,
                })
                db.close();
            });
        }
    })
}


// 修改教师信息
exports.UpdataTeachers = (whereStr, updateStr, callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('teacher').updateOne({
            _id: ObjectId(whereStr)
        }, {
            $set: {
                data: updateStr
            }
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            db.close();
        })
    })
}

// 删除教师信息
exports.DeleteTeacherOne = (id, callback) => {
    // console.log(id);
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('teacher').deleteOne({
            _id: ObjectId(id)
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            db.close();
        })
    })
}



// 添加管理员登录
exports.addlogins = (data, callback) => {
    // console.log('添加管理员登录');
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbase = db.db("htgl");
        dbase.collection('login').insertOne({
            ...data
        }, function (err, res) {
            if (err) throw err;
            callback(res.ops)
            // 关闭数据库
            db.close();
        });
    });
}

// 添加管理员信息
exports.addadmins = (data, callback) => {
    // console.log('添加管理员信息');
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbase = db.db("htgl");
        dbase.collection('information').insertOne({
            ...data
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            // 关闭数据库
            db.close();
        });
    });
}


// ***获取管理员****

exports.getLogins = (body, callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        // console.log(body);
        dbo.collection('login').find(body).toArray(function (err, res) {
            if (err) throw err;
            callback(res)
            db.close();
        });
    })
}
// 添加学生信息
exports.addLists = (data, callback) => {
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbase = db.db("htgl");
        dbase.collection('student').insertOne({
            data
        }, function (err, res) {
            if (err) throw err;
            callback(res)
            // 关闭数据库
            db.close();
        });
    });
}


// 获取所有学生信息
exports.getAllaministrators = (body, callback) => {
    let idx = body.idx || 1;
    let date = body.data || {}
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        // console.log(body);
        dbo.collection('login').find(date).toArray((err, result) => {
            if (err) throw err;
            selcetFn(Math.ceil(result.length / 10))
        });
        let selcetFn = (total) => {

            if (idx != 1 && idx > total) {
                idx = total
            }
            dbo.collection('login').find(date).skip((idx - 1) * 10).limit(10).toArray((err, result) => {
                if (err) throw err;
                callback({
                    result,
                    total,
                })
                db.close();
            });
        }
    })
}


// 获取管理员信息
exports.getadmins = (body, callback) => {
    // console.log(body);
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('information').find(body).toArray(function (err, res) {
            if (err) throw err;
            callback(res)
            db.close();
        });
    })
}


// 删除管理员
exports.DeleteLoginOne = (id, callback) => {
    // console.log(id);
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('login').deleteOne({
            _id: ObjectId(id)
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            db.close();
        })
    })
}

// 删除管理员信息
exports.DeleteAdminOne = (usernameId, callback) => {
    // console.log();
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('information').deleteOne({
            usernameId
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            db.close();
        })
    })
}


// 修改登录
exports.UpdataLogin = (whereStr, updateStr, callback) => {
    console.log(whereStr, updateStr);
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('login').updateOne({
            _id: ObjectId(whereStr)
        }, {
            $set: {
                ...updateStr
            }
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            db.close();
        })
    })
}

// 修改登录信息
exports.UpdataAdmin = (usernameId, updateStr, callback) => {

    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, db) {
        let dbo = db.db("htgl");
        dbo.collection('information').updateOne({
            usernameId
        }, {
            $set: {
                ...updateStr
            }
        }, function (err, res) {
            if (err) throw err;
            callback(res.result)
            db.close();
        })
    })
}