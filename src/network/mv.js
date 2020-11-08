import { request } from "./request"

export function getAllMv(area, type, order, offset = 0, limit = 12) {
  //video标签全部分类
  return request({
    url: `/mv/all`,
    params: {
      area,
      type,
      order,
      limit,
      offset
    }
  })
}
