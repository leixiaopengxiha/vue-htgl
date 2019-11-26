// 封装mongodb模块

// 1.引入mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/buba',{useNewUrlParser:!0});
// 向外暴露Schema构造函数
module.exports=(option)=>{return mongoose.Schema(option)};