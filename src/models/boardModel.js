import Joi, { date } from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE_MESSAGE,OBJECT_ID_RULE } from './validators'
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds : Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy : Joi.boolean().default(false)

})
const createNew = async (data)=>{
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async(id)=>{
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne(
      {
        _id:id
      }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById
}