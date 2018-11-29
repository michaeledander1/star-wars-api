import {JsonController, Get, Param, BadRequestError, /*BadRequestError*/} from 'routing-controllers'
import { /*Film,*/ Planet, Character } from './entities'
import { Brackets } from 'typeorm'

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
            .getMany()
        } else {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
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
            .getMany()
        } else if (asc === 'tall') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.height", "DESC")
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
            .getMany()
        } else if (asc === 'old') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.age", "DESC")
            .getMany()  
        } else throw new BadRequestError('Incorrect param passed')
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
  }