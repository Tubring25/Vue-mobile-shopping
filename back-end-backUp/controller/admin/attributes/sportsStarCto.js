const sportsStarModule = require('../../../model/attributes/sports_star_shoe');

class sportsStarCto {
  constructor() {
    this.instance = sportsStarModule
  }
  async getList(data) {
    try {
      let res = await this.instance.findAll()
      return {code: 1, data: res}
    } catch (err){return {code: 0, data: err}}
  }
  async addItem (data){
    const {name} = data
    if(!name.trim()){
      return {code: 0, data: '缺少关键字'}
    }
    this.instance.create({name: name})
    return {code: 1, data: '添加成功'}
  }
  async editItem(data) {
    const {id, name} = data
    if(!id || !name.tirm()) {
      return {code: 0, data: '缺少关键字'}
    }
    try{
      let hasOne = await this.instance.findAll({where: {id: id}})
      if(hasOne.length == 0) {
        return {code: 0, data: '查无此数据'}
      }
      this.instance.update({name: name}, {where: {id: id}})
      return {code: 1, data: '更新成功'}
    } catch(err) {return {code: 0, data: err}}
  }
  async deleteItem(data) {
    const {id} = data
    if(!id) {
      return {code: 0, data: '缺少关键字'}
    }
    try{
      this.instance.deleteItem({where:{id:id}})
      return {code: 1, data: '删除成功'}
    } catch(err) { return {code: 0, data: err}}
  }
}
module.exports = new sportsStarCto()