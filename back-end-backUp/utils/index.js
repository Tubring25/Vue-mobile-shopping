const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const Utils = {
  serect: 'Shoot',
  createToken(data) {
    return jwt.sign({ data: data }, this.serect, { expiresIn: '2d' });
  },
  verifyToken(token) {
    try {
      return jwt.verify(token, this.serect)
    }
    catch {
      return 'token已失效'
    }
  },
  /**
   * 删除文件夹
   * @param {String} url 文件路径,绝对路径
   * @return {Null}
   */
  deleteFile(url, name) {
    var files = [];
    return new Promise((resolve, reject) =>{
      if (fs.existsSync(url)) {    //判断给定的路径是否存在
        files = fs.readdirSync(url);    //返回文件和子目录的数组
        files.forEach(function (file, index) {
          var curPath = path.join(url, file);
          if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
            deleteFile(curPath, name);
          } else {
            if (file.indexOf(name) > -1) {    //是指定文件，则删除
              fs.unlinkSync(curPath);
              resolve('删除成功')
            }
          }
        });
      } else {
        reject('删除失败')
      }
    })
    
  }
}

module.exports = Utils
