
import express from 'express'
import { CONNECT_DB,GET_DB,CLOSE_DB } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'
import { corsOptions } from './config/cors'
import cors from 'cors'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
const START_SERVER = ()=>{
  const app = express()
  app
  app.use(express.json())
  app.use(cors(corsOptions))
  app.use('/v1', APIs_V1)
// midleware xu ly loi
  app.use(errorHandlingMiddleware)
  if(env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Hello production, I am running at ${process.env.PORT}`)
    })
  }else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Hello local dev, I am running at ${ env.LOCAL_DEV_APP_HOST }:${ env.LOCAL_DEV_APP_PORT }`)
    })
  }
  
  // thực hiện các tác vụ clean up trước khi dừng server
  exitHook(()=>{
    console.log('4')
    CLOSE_DB()
    console.log('5')
  })
}

(async() => {
  try {
    console.log('1.connecting to mongodb')
    await CONNECT_DB()
    console.log('2.')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
// CONNECT_DB()
//   .then(()=> console.log('connect to database'))
//   .then(()=>START_SERVER())
//   .catch(error=>{
//     console.error(error)
//     process.exit(0)
//   })

