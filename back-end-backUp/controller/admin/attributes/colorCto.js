const colorModule = require('../../../model/attributes/color');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class colorService {
  // 获取颜色列表
  async getColorList () {
    try {
     let res = await colorModule.findAll()
      return {code:1, data: res}
    }catch(err) {return {code: 0, data: err}}
  }
  // 添加颜色
  async addColor (data) {
    const {name, code} = data
    if(!name || !code ) {
      return {code: 0, data: '缺少字段'}
    }
    try {
      let hasOne = await colorModule.findAll({where: {[Op.or]: [{name: name}, {code: code}]}})
      console.log(hasOne)
      if (hasOne.length > 0 ) {
        return { code: 0, data: '不可重复添加'}
      }
      colorModule.create({name: name, code: code})
      return {code: 1 , data: '添加成功'}
    } catch(err) { return {code: 0, data: err}}
  }
  // 修改颜色值
  async editColor (data) {
    const {id, name, code} = data
    if(!id || !name || !code) {
      return {code: 0, data: '缺少字段'}
    }
    try {
      let hasOne = await colorModule.findAll({where: {id:id}})
      if (hasOne.length == 0 ) {
        return { code: 0, data: '无此数据'}
      }
      colorModule.update({name: name, code: code}, {where:{id:id}})
      return { code: 1, data: '修改成功' }
    } 
    catch(err) { return {code: 0, data: err}}
  }
  // 删除颜色值
  async deleteColor(data) {
    let {id} = data
    if(!id) {return {code: 0, data: '缺少id'}}
    try {
      colorModule.deleteItem({where:{id:id}})
      return {code: 1, data: '删除成功'}
    } catch(err) { return {code: 0, data: err}}
  }
}
module.exports = new colorService()