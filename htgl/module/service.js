// 1.引入管理员模块
const admin = require("./admin");
// jwt 加密文件
let jwt = require("jsonwebtoken");
let formidable = require('formidable')
const path = require("path");

// 登录
exports.LoginHandle = (req, res) => {
    let body = req.body;
    admin.login(body, result => {
        if (result.length != 0) {
            res.json({
                code: 20000,
                data: {
                    vip: result[0].vip,
                    token: jwt.sign({
                            username: result[0].username,
                            id: result[0]._id
                        },
                        "abcd", {
                            // 过期时间
                            expiresIn: "1h"
                        }
                    )
                }
            })

        } else {
            res.json({
                code: 60204,
                message: "密码错误或者用户名不充在"
            })
        }
    });
};

// 获取用户信息
exports.Getadmin = (req, res) => {
    jwt.verify(req.query.token, "abcd", function (err, decode) {
        // console.log(decode);
        if (err) {
            res.json({
                code: 5005,
                data: "success",
                message: "用户未登录"
            });
        } else {
            let usernameId = decode.username + decode.id;
            admin.findBiao({
                    usernameId
                },
                datas => {
                    if (datas.length != 0) {
                        // console.log(datas);
                        res.json({
                            code: 20000,
                            data: {
                                roles: [datas[0].vip],
                                introduction: `I am an ${datas[0].username}`,
                                avatar: datas[0].portrait,
                                name: `${datas[0].username}`,
                                vip: `${datas[0].vip}`,
                                token: jwt.sign({
                                        username: datas[0].usernameId
                                    },
                                    "abcd", {
                                        // 过期时间
                                        expiresIn: "1h"
                                    }
                                )
                            }
                        });
                    } else {
                        res.json({
                            code: 50008,
                            message: "登录失败"
                        });
                    }
                }
            );
        }
    });
};

// 退出登录
exports.Logout = (req, res) => {
    res.json({
        code: 20000,
        data: "success"
    });
};

// 添加
exports.Addlist = (req, res) => {
    let body = req.body;
    // console.log(body);
    admin.addLists(body, date => {
        res.json({
            code: 20000,
            data: "success"
        });
    });
};

// 获取全部学生数据
exports.GetAllStudents = (req, res) => {
    let body = req.body;
    admin.getAllstudent(body, date => {
        res.json({
            code: 20000,
            date
        });
    });
};

// 修改教师信息
exports.UpdataStudent = (req, res) => {
    let body = req.body;
    let {
        _id,
        data
    } = body;
    admin.UpdataStudent(_id, data, data => {
        if (data.ok === 1 && data.n === 1) {
            res.json({
                code: 20000,
                data: "success"
            });
        } else {
            res.json({
                code: 404,
                data: "errer"
            });
        }
    });
};

// 删除学生
exports.DeleteStudent = (req, res) => {
    let {
        id,
        data
    } = req.body;
    // console.log(id);
    let dataArr = []
    let deletct = (id) => {
        admin.DeleteStudentOne(id, datas => {
            if (data) {
                if (datas.ok === 1 && datas.n === 1) {
                    dataArr.push(datas)
                }
                if (data.length == dataArr.length) {
                    res.json({
                        code: 20000,
                        data: "success"
                    });
                }
            } else {
                if (datas.ok === 1 && datas.n === 1) {
                    res.json({
                        code: 20000,
                        data: "success"
                    });
                }
            }
        });
    }
    if (data) {
        data.map(item => {
            deletct(item._id)
        })
    } else {
        deletct(id)
    }
};

// 添加教师
exports.AddTeacher = (req, res) => {
    let body = req.body;
    console.log(body);
    admin.addteachers(body, date => {
        res.json({
            code: 20000,
            data: "success"
        });
    });
};

// 获取全部班主任数据
exports.GetTeachers = (req, res) => {
    let body = req.body;
    //   console.log(body);
    admin.getTeacher(body, date => {
        res.json({
            code: 20000,
            date
        });
    });
};

// 修改教师信息
exports.UpdataTeacher = (req, res) => {
    let body = req.body;
    let {
        _id,
        data
    } = body;
    admin.UpdataTeachers(_id, data, data => {
        if (data.ok === 1 && data.n === 1) {
            res.json({
                code: 20000,
                data: "success"
            });
        } else {
            res.json({
                code: 404,
                data: "errer"
            });
        }
    });
};


// 删除班主任
exports.DeleteTeacher = (req, res) => {
    let {
        id,
        data
    } = req.body;
    let dataArr = []
    let deletct = (id) => {
        admin.DeleteTeacherOne(id, datas => {
            if (data) {
                if (datas.ok === 1 && datas.n === 1) {
                    dataArr.push(datas)
                }
                if (data.length == dataArr.length) {
                    res.json({
                        code: 20000,
                        data: "success"
                    });
                }
            } else {
                if (datas.ok === 1 && datas.n === 1) {
                    res.json({
                        code: 20000,
                        data: "success"
                    });
                }
            }

        });
    }
    if (data) {
        data.map(item => {
            deletct(item._id)
        })
    } else {
        deletct(id)
    }
};

// 管理员
exports.Administrators = (req, res) => {
    let {
        name,
        username,
        age,
        sex,
        vip,
        password,
        checkPass
    } = req.body
    if (password !== checkPass) {
        res.json({
            code: 50004,
            data: "两次密码不一致"
        })
        return
    }
    // 获取登录账号是否已经从在
    admin.getLogins({
        username
    }, docs => {
        if (docs.length !== 0) {
            res.json({
                code: 20000,
                warning: 'warning',
                data: "登录账号已经从在"
            })
            return
        }
        // 添加登录
        let logindata = {
            username,
            password,
        }
        admin.addlogins(logindata, (data) => {
            if (!data.length) {
                res.json({
                    code: 50003,
                    data: "添加失败"
                })
                return
            }

            // 添加管理员信息
            let adminList = {
                usernameId: data[0].username + data[0]._id,
                name,
                sex,
                age,
                vip,
            }
            admin.addadmins(adminList, (doc) => {
                if (doc.n === 1 && doc.ok === 1) {
                    res.json({
                        code: 20000,
                        data: "success"
                    })
                } else {
                    res.json({
                        code: 50003,
                        data: "添加失败"
                    })
                }
            })
        })
    })


}

// 获取管理员
exports.Allaministrators = (req, res) => {
    let body = req.body;
    let login = {}
    admin.getAllaministrators(body, date => {
        let arr = []
        date.result.map(item => {
            let names = {
                usernameId: item.username + item._id
            }
            admin.getadmins(names, doc => {
                let objs = {
                    ...doc[0],
                    ...item
                }
                arr = [...arr, objs]
                if (date.result.length == arr.length) {
                    res.json({
                        code: 20000,
                        data: arr,
                        total: date.total
                    })
                }
            })
        })
    });
}


// 删除管理员
exports.Deleteaministrator = (req, res) => {
    let {
        id,
        usernameId,
        data
    } = req.body;
    let dataArr = []
    let deletct = (id, usernameId) => {
        admin.DeleteLoginOne(id, datas => {
            if (data) {
                if (datas.ok === 1 && datas.n === 1) {
                    admin.DeleteAdminOne(usernameId, doc => {

                        dataArr.push(doc)
                        if (data.length == dataArr.length) {
                            // console.log('sd');
                            res.json({
                                code: 20000,
                                data: "success"
                            });
                        }
                    })
                }
            } else {
                if (datas.ok === 1 && datas.n === 1) {
                    admin.DeleteAdminOne(usernameId, doc => {
                        if (doc.ok === 1 && doc.n === 1) {
                            res.json({
                                code: 20000,
                                data: "success"
                            });
                        }
                    })
                }
            }
        });
    }
    if (data) {
        data.map(item => {
            deletct(item._id, item.usernameId)
        })
    } else {
        deletct(id, usernameId)
    }
};


// 修改管理员
exports.Updataaministrator = (req, res) => {
    let body = req.body;
    // console.log(req.body);
    let {
        _id,
        usernameId,
        name,
        sex,
        age,
        vip,
        username,
        password,
        checkPass
    } = body;
    if (password !== checkPass) {
        res.json({
            code: 50004,
            data: "两次密码不一致"
        })
        return
    }
    let adminlogin = {
        username,
        password
    }
    let adminList = {
        usernameId: username + _id,
        name,
        sex,
        age,
        vip,
    }

    admin.UpdataLogin(_id, adminlogin, (doc) => {
        if (doc.n === 1 && doc.ok === 1) {
            admin.UpdataAdmin(usernameId, adminList, (data) => {
                if (data.n === 1 && data.ok === 1) {
                    res.json({
                        code: 20000,
                        data: "success"
                    })
                } else {
                    res.json({
                        code: 50003,
                        data: "修改失败"
                    })
                }
            })
        } else {
            res.json({
                code: 50003,
                data: "修改失败"
            })
        }
    })

};








exports.TopImg = (req, res) => {
    let form = new formidable.IncomingForm();
    // console.log(req.body);
    // 这个路径必须要真实存在
    form.uploadDir = path.resolve("./public/img/upload"); // 上传默认路径
    form.keepExtensions = true; // 保留文件后缀名
    // req就是上边的第一个参数
    // 先错误，再字段，后文件
    form.parse(req, (err, fields, files) => {
        console.log(fields, files);
        if (err) {
            //   return res.send(
            //     '<script>alert("修改学籍发生错误，请稍后重试");location.href("/fileStang")</script>'
            //   );
        }
        console.log(fields); // 传过来的字段
        // 传过来的文件

        // 解析图片路径
        // 通过base获得文件名
        let img = "/img/upload/" + path.parse(files.file.path).base;
        let data = {
            images: img,
            //   title: fields.title,
        };
        console.log(data);
        // student.insertFile(data, result => {
        //   if (result) {
        //     res.redirect('/fileStang')
        //   } else {
        //     res.send(
        //       '<script>alert("更新失败，请稍后重试");location.href("/manage/student")</script>'
        //     );
        //   }
        // });
    });
}