import {/*Controller,*/ JsonController, Get, Param, /*BadRequestError*/} from 'routing-controllers'
import { Film, Planet, Character } from './entities'

@JsonController()
export default class MainController {

    @Get("/films/:id([0-9]+)")
    async getFilm(
      @Param('id') id: number
    ) {
      return Film.findOne(id) 
    }

    @Get("/planets/:id([0-9]+)")
    async getPlanets(
      @Param('id') id: number
    ) {
      const planet = await Planet.find({
        relations: ["characters"],
        where: {id : id}
      })
      return planet
      // if (!planet) throw new BadRequestError('Planet does not exist')
      // if(planet.characters.length === 0) throw new BadRequestError('this planet has no characters')
      // return planet.characters
    }

    @Get('/characters')
    getCharacters() {
      return Character.find()
    }
}