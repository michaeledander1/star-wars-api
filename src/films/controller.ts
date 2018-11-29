import {JsonController, Get, Param, BadRequestError} from 'routing-controllers'
import { Planet, Character } from './entities'

@JsonController()
export default class MainController {

    @Get("/films/:id([0-9]+)/characters/:sex?")
    async getCharactersBySex(
      @Param('id') id: number,
      @Param('sex') sex: string
    ) {
        if (sex) {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .andWhere("character.sex = :sex", {sex: sex})
            .take(30)
            .getMany()
        } else {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .take(30)
            .getMany()
        }
      }

    @Get("/films/:id([0-9]+)/characters/height/:asc?")
    async getCharactersByHeight(
      @Param('id') id: number,
      @Param('asc') asc: string
    ) {
        if (asc === 'short') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.height", "ASC")
            .take(30)
            .getMany()
        } else if (asc === 'tall') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.height", "DESC")
            .take(30)
            .getMany()  
        } else throw new BadRequestError('Incorrect param passed')
    }

    @Get("/films/:id([0-9]+)/characters/age/:asc?")
    async getCharacters(
      @Param('id') id: number,
      @Param('asc') asc: string
    ) {
        if (asc === 'young') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.age", "ASC")
            .take(30)
            .getMany()
        } else if (asc === 'old') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.age", "DESC")
            .take(30)
            .getMany()  
        } else throw new BadRequestError('Incorrect param passed')
    }

    @Get("/planets/:climate")
    async getPlanets(
      @Param('climate') climate: string
    ) {
      return await Planet.createQueryBuilder("planet")
        .leftJoinAndSelect("planet.characters", "character", "character.hair_color IN (:...hair_color)", { hair_color: ["brown", "black"] } )
        .where("planet.climate = :climate", { climate: climate })
        .take(30)
        .getMany()
      }
  }