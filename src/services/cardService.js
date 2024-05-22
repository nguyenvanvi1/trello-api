import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    // xu lý logic dữ liệu tùy đặc thù dự án
    const newCard = {
      ...reqBody
    }
    // gọi tới tần model để xử lý lưu trữ bảng ghi newcard vào trong database
    const createCard = await cardModel.createNew(newCard)
    console.log(createCard)
    const getNewCard = await cardModel.findOneById(createCard.insertedId)
    //tra ket qua ve, trong service luon phai co return
    if(getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard)
    }
    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService ={
  createNew
}