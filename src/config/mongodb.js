/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
//JNaHuxI7QU0huI0I
//nvvinvla12019
const MONGODB_URI = 'mongodb+srv://nvvinvla12019:JNaHuxI7QU0huI0I@cluster0.cfrkmbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const DATABASE_NAME = 'trello-mern-stack-pro'

import { MongoClient, ServerApiVersion } from 'mongodb'
let trelloDatabaseInstance = null
// khoi tao doi tuong mongodbClientInstance de connect toi mongodb
const mongodbClientInstance = new MongoClient(MONGODB_URI,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
})
export const CONNECT_DB  =async ()=>{
    // goi ket noi toi mongodb atlats voi url da khai bao trong than cua mongodbClientInstance
    await mongodbClientInstance.connect()
    //ket noi thanh cong thi lay ra database theo ten va gan nguoc lai vao bien trelloDatabaseInstance
    trelloDatabaseInstance = mongodbClientInstance.db(DATABASE_NAME)
}
export const GET_DB = ()=>{
    if(!trelloDatabaseInstance) throw new Error('must connect to database first')
    return trelloDatabaseInstance
}
export const CLOSE_DB = async () => {
    console.log('log')
    await mongodbClientInstance.close()
}