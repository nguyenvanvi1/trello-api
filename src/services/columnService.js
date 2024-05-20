
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    // xu lý logic dữ liệu tùy đặc thù dự án
    const newColumn = {
      ...reqBody
    }
    // gọi tới tần model để xử lý lưu trữ bảng ghi newColumn vào trong database
    const createColumn = await columnModel.createNew(newColumn)
    console.log(createColumn)
    const getNewColumn = await columnModel.findOneById(createColumn.insertedId)
    //tra ket qua ve, trong service luon phai co return
    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService ={
  createNew
}
