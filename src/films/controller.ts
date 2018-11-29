import {JsonController, Get, Param, BadRequestError} from 'routing-controllers'
import { Planet, Character } from './entities'

/* As both the planets and characters are reliant on films, I decided to place all the controllers 
and entities in on films folder. These could also have their own folder, but I consciously decided to keep
them together. */

@JsonController()
export default class MainController {
  
  //Returns all characters of a given film
  //If using seed data, you can test with =====>    http :4000/films/1/characters
    @Get("/films/:id([0-9]+)/characters")
    async getCharacters(
      @Param('id') id: number
    ) {
      return await Character.createQueryBuilder("character")
        .where("character.film_id = :film_id", { film_id: id })
        .take(30)
        .getMany()
    }

  //Returns characters of a given film filtered by sex
  //If using seed data, you can test with =====> http :4000/films/1/characters/male OR http :4000/films/1/characters/female
    @Get("/films/:id([0-9]+)/characters/:sex")
    async getCharactersBySex(
      @Param('id') id: number,
      @Param('sex') sex: string
    ) {
        return await Character.createQueryBuilder("character")
          .where("character.film_id = :film_id", { film_id: id })
          .andWhere("character.sex = :sex", {sex: sex})
          .take(30)
          .getMany()
      }
  
  //Returns characters of a given film ordered by height
  //If using seed data, you can test with =====> http :4000/films/1/characters/height/tall OR http :4000/films/1/characters/height/short
    @Get("/films/:id([0-9]+)/characters/height/:asc")
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

  //Returns characters of a given film ordered by age
  //If using seed data, you can test with =====> http :4000/films/1/characters/age/young OR http :4000/films/1/characters/age/old
    @Get("/films/:id([0-9]+)/characters/age/:asc")
    async getCharactersByAge(
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

  //Returns planets by climate and all dark haired people from planet
  //If using seed data, best to test with is ====>  http :4000/planets/temperate
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