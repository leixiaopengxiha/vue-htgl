// 路由模块
const express = require("express");
const service = require("./service");
let router = express.Router();
console.log("说的就是看到");
router
  // 登录
  .post("/login", service.LoginHandle)
  .get("/getadmin", service.Getadmin)
  .post("/logout", service.Logout)
  // 学生
  .post("/addlist", service.Addlist)
  .post("/getallstudent", service.GetAllStudents)
  .post("/updatastudent", service.UpdataStudent)
  .post("/deletestudent", service.DeleteStudent)
  // 班主任
  .post("/addteacher", service.AddTeacher)
  .post("/getteachers", service.GetTeachers)
  .post("/updatateacher", service.UpdataTeacher)
  .post("/deleteteacher", service.DeleteTeacher)
  // 管理员
  .post('/administrators', service.Administrators)
  .post('/allaministrators', service.Allaministrators)
  .post('/deleteaministrator', service.Deleteaministrator)
  .post('/updataaministrators', service.Updataaministrator)



  // 上传头像
  .post('/topimg', service.TopImg)
module.exports = router;