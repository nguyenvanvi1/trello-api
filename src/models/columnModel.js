import Joi from 'joi'
import { OBJECT_ID_RULE_MESSAGE,OBJECT_ID_RULE } from './validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé, (lúc quay video số 57 mình quên nhưng sang đầu video số 58 sẽ có nhắc lại về cái này.)
  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
const  validateBeforeCreate = async (data)=>{
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data,{abortEarly:false})
}
const createNew = async (data)=>{
  try {
    const validData = await validateBeforeCreate(data)
    const newColumnToAdd = {
      ...validData,
      boardId:new ObjectId(validData.boardId)
    }
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(newColumnToAdd)
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async(id)=>{
  try {
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne(
      {
        _id: new ObjectId(id)
      }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const pushCardOrderIds = async(card)=>{
  try{
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      {
        _id:new ObjectId(card.columnId)
      },
      {
        $push:{cardOrderIds:new ObjectId(card._id)}
      },
      { returnDocument: 'after' }
    )
    return result

  } catch(error) { throw new Error(error) }
}
export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  validateBeforeCreate,
  createNew,
  findOneById,
  pushCardOrderIds
}