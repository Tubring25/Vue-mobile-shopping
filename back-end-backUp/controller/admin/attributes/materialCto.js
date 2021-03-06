const materialModule = require('../../../model/attributes/material');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class materialService {
  async getList (data) {
    let { type } = data
    try {
      let resData
      if (type) {
        resData = await materialModule.findAll({where: {type: Number(type)}})
      } else {
        let clothesRes = await materialModule.findAll({where: {type: 0}})
        let shoeRes = await materialModule.findAll({where: {type: 1}})
        resData = [clothesRes, shoeRes]
      }
      return {code:1, data: resData}
    }catch(err) {return {code: 0, data: err}}
  }
  async addItem (data) {
    const {name, type} = data
    if(!name || !type ) {
      return {code: 0, data: '缺少字段'}
    }
    try {
      let hasOne = await materialModule.findAll({where: {name: name, type: type}})
      console.log(hasOne)
      if (hasOne.length > 0 ) {
        return { code: 0, data: '不可重复添加'}
      }
      materialModule.create({name: name, type: type})
      return {code: 1 , data: '添加成功'}
    } catch(err) { return {code: 0, data: err}}
  }
  async editItem (data) {
    const {id, name, type} = data
    if(!id || !name || !type) {
      return {code: 0, data: '缺少字段'}
    }
    try {
      let hasOne = await materialModule.findAll({where: {id:id}})
      if (hasOne.length == 0 ) {
        return { code: 0, data: '无此数据'}
      }
      materialModule.update({name: name, type: type}, {where:{id:id}})
      return { code: 1, data: '修改成功' }
    } 
    catch(err) { return {code: 0, data: err}}
  }
  async deleteItem(data) {
    let {id} = data
    if(!id) {return {code: 0, data: '缺少id'}}
    try {
      materialModule.deleteItem({where:{id:id}})
      return {code: 1, data: '删除成功'}
    } catch(err) { return {code: 0, data: err}}
  }
}
module.exports = new materialService()