/**
 * apis for goods
 */
import request from '@/utils/request';

// 获取商品分类列表
export function getGoodsCategory(data) {
  return request({
    url: '/shop/goods/getGoodsType',
    method: "post",
    data,
    private: false
  })
}