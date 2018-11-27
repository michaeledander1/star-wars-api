import {Controller, Get} from 'routing-controllers'
import { Film } from './entities'

@Controller()
export default class MainController {

    @Get("/films")
    getEvents() {
      return Film.find()
    }
}