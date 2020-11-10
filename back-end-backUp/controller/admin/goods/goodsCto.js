const goodsSpuModule = require('../../../model/goods/goodsSpu');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const formiable = require('formidable');
const path = require("path");



class goodsService {
  async addSkuImg(req, res) {
    console.log(req)
    let reqInfo = req    
    let that = this
    let form = new formiable.IncomingForm();
    form.encoding = "utf8";
    form.keepExtensions = true; // 是否包括 扩展名
    form.maxFieldsSize = 4 * 1024 * 1024; // 最大字节数   
    form.parse(req, (err, fields, files) => {
      let goodsId = fields.tempId
      // if (!fs.existsSync('public/goods/' + goodsId.replace("\"", "").replace("\"", ""))) {
      //   fs.mkdirSync('public/goods/' + goodsId.replace("\"", "").replace("\"", ""));
      // }
      // let uploadPath = path.join(__dirname, "../../../public/goods/" + goodsId.replace("\"", "").replace("\"", ""));
      form.uploadDir = path.join(__dirname, "../../../public/goods/NK01604972960394214");
      let file = files.file;
      if (err) {
        return ("服务器错误" + err, null);
      }
      if (file.size > form.maxFileSize) {
        fs.unlink(file.path);
        return ("图片不得超过3M", null);
      }

      let extName = "";
      if (file.type == "image/png" || file.type == "image/x-png") {
        extName = "png";
      } else if (file.type == "image/jpg" || file.type == "image/jpeg") {
        extName = "jpg";
      }
      if (extName.length == 0) {
        return ("只支持png与jpg格式的图片", null);
      }
      console.log(file)
      let timestamp = Number(new Date());
      let num = Math.floor(Math.random() * 1000);
      let imageName = `${timestamp}_${num}.${extName}`;
      let newPath = form.uploadDir + "/" + imageName;
      fs.rename(file.path, newPath, (err) => {
        if (err) {
          return (err, null);
        } else {
          return (null, newPath);
        }
      });

    });
  }
  getFileName(req) {
    return new Promise((resolve, reject) => {
      let form = new formiable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(fields.tempId)
        }
      })
    })
  }
  createFolder(imgPath) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(imgPath)) {
        fs.mkdirSync(imgPath);
        resolve({ code: 1 })
      } else {
        resolve({ code: 1 })
      }
    })
  }
}

module.exports = new goodsService()