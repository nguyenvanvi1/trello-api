import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
const createNew = async(req, res, next) => {
  try {
    //res.status(StatusCodes.CREATED).json({ message:'post from controller' })

    const createdBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNew
}
