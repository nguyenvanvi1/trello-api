
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

export const columnValidation = {
  createNew
}