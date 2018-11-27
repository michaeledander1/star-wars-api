import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import FilmController from "./films/controller"
import setupDb from './db'

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [
     FilmController
    ]
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))