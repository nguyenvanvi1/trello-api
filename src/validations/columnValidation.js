
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/AppError'
import { OBJECT_ID_RULE_MESSAGE,OBJECT_ID_RULE } from '~/models/validators'
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
   boardId:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
   title:Joi.string().required().min(3).max(50).trim().strict()
  })
  try {
    console.log(req.body)
    await correctCondition.validateAsync(req.body, { abortEarly:false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const update = async (req, res, next) => {
  // khong dung required trong truong hop update du lieu
  const correctCondition = Joi.object({
    boardId:Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title:Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )
  })
  try {
    console.log(req.body)
    await correctCondition.validateAsync(req.body,
      { abortEarly:false,
        allowUnknown : true 
      
      })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const deleteItem = async (req, res, next) => {
  const correctCondition = Joi.object({
    id:Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await correctCondition.validateAsync(req.params)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
export const columnValidation = {
  createNew,update,deleteItem
}