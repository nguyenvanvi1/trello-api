import { slugify } from '~/utils/formatter'
const createNew =  async (reqBody)=>{
// eslint-disable-next-line no-useless-catch
try {
    const newBoard = {
        ...reqBody,
        slug:slugify(reqBody.title)
    }
    //tra ket qua ve, trong service luon phai co return
    return newBoard
} catch (error) {
    throw error
}
}
export const boardService ={
    createNew
}
