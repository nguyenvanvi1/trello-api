import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formatter'
const createNew =  async (reqBody)=>{
// eslint-disable-next-line no-useless-catch
try {
    // xu lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
        ...reqBody,
        slug:slugify(reqBody.title)
    }
    // gọi tới tần model để xử lý lưu trữ bảng ghi newBoard vào trong database
    const createBoard = await boardModel.createNew(newBoard)
    console.log(createBoard);
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    //tra ket qua ve, trong service luon phai co return
    return getNewBoard
} catch (error) {
    throw error
}
}
export const boardService ={
    createNew
}
