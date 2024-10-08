import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/AppError'
import { StatusCodes } from 'http-status-codes'
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
    if(getNewColumn) {
      getNewColumn.cards=[]
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) {
    throw error
  }
}
const update = async (columnId,reqBody) => {

  try {
    const updateData = {
        ...reqBody,
        updatedAt: Date.now()
    }
    const updateColumn = await columnModel.update(columnId,updateData)
    return updateColumn
  } catch (error) {
    throw error
  }
}
const deleteItem = async (columnId) => {
const targetColumn = await columnModel.findOneById(columnId)
if(!targetColumn) {
  throw new ApiError(StatusCodes.NOT_FOUND,'Column not found')
}
  try {
    await columnModel.deleteOneById(columnId)
    await cardModel.deleteManyByColumnId(columnId)
    await boardModel.pullColumnOrderIds(targetColumn)
   return {deleteResult:'Column and its Cards deleted successfully'}
  } catch (error) {
    throw error
  }
}
export const columnService ={
  createNew,
  update,
  deleteItem
}
