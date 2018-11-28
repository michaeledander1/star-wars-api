import {JsonController, Get, Param, /*BadRequestError*/} from 'routing-controllers'
import { Film, Planet, Character } from './entities'
import { Brackets } from 'typeorm'

@JsonController()
export default class MainController {

    @Get("/films/:id([0-9]+)")
    async getFilm(
      @Param('id') id: number
    ) {
      return Film.findOne(id) 
    }

    @Get("/planets/:climate")
    async getPlanets(
      @Param('climate') climate: string
    ) {
      return await Planet.createQueryBuilder("planet")
        .leftJoinAndSelect("planet.characters", "character")
        .where("planet.climate = :climate", { climate: climate })
        .andWhere(new Brackets(qb => {
          qb.where("character.hair_color = :hair_color", { hair_color: "brown"})
            .orWhere("character.hair_color = :hair_color", { hair_color: "black"})
        }))
        .getMany()
      }
      // if (!planet) throw new BadRequestError('Planet does not exist')
      // if(planet.characters.length === 0) throw new BadRequestError('this planet has no characters')
      // return planet.characters

    @Get('/characters')
    getCharacters() {
      return Character.find()
    }
}