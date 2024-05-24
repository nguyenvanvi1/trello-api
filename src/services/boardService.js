import { StatusCodes } from 'http-status-codes'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/AppError'
import { slugify } from '~/utils/formatter'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
const createNew = async (reqBody) => {
// eslint-disable-next-line no-useless-catch
  try {
    // xu lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug:slugify(reqBody.title)
    }
    // gọi tới tần model để xử lý lưu trữ bảng ghi newBoard vào trong database
    const createBoard = await boardModel.createNew(newBoard)
    console.log(createBoard)
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    //tra ket qua ve, trong service luon phai co return
    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card=>card.columnId.equals(column._id))
      //column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw error
  }
}

const update = async (boardId,reqBody) => {

  try {
    const updateData = {
        ...reqBody,
        updatedAt: Date.now()
    }
    const updateBoard = await boardModel.update(boardId,updateData)
    return updateBoard
  } catch (error) {
    throw error
  }
}
const moveCardToDifferentColumnAPI = async (reqBody) => {

  try {
    await columnModel.update(reqBody.prevColumnId,{
      cardOrderIds:reqBody.prevCardOrderIds,
      updatedAt:Date.now()
    })
    await columnModel.update(reqBody.nextColumnId,{
      cardOrderIds:reqBody.nextCardOrderIds,
      updatedAt:Date.now()
    })
    await cardModel.update(reqBody.currentCardId,{
      columnId: reqBody.nextColumnId
    })
    return {updateResult:'Successfully'}
  } catch (error) {
    throw error
  }
}
export const boardService ={
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumnAPI
}
