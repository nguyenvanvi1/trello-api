

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'
let trelloDatabaseInstance = null
// khoi tao doi tuong mongodbClientInstance de connect toi mongodb
const mongodbClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi:{
    version:ServerApiVersion.v1,
    strict:true,
    deprecationErrors:true
  }
})
export const CONNECT_DB =async () => {
  // goi ket noi toi mongodb atlats voi url da khai bao trong than cua mongodbClientInstance
  await mongodbClientInstance.connect()
  //ket noi thanh cong thi lay ra database theo ten va gan nguoc lai vao bien trelloDatabaseInstance
  trelloDatabaseInstance = mongodbClientInstance.db(env.DATABASE_NAME)
}
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('must connect to database first')
  return trelloDatabaseInstance
}
export const CLOSE_DB = async () => {
  console.log('log')
  await mongodbClientInstance.close()
}