import {JsonController, Get, Param, BadRequestError, QueryParam} from 'routing-controllers'
import { Planet, Character } from './entities'

/* As both the planets and characters are reliant on films, I decided to place all the controllers 
and entities in on films folder. These could also have their own folder, but I consciously decided to keep
them together. */

@JsonController()
export default class MainController {

  /* Returns all characters of a given film
  If using seed data, you can test with =>    http :4000/films/1
                                              http :4000/films/1?sort=height_desc
                                              http :4000/films/1?sort=height_asc
                                              http :4000/films/1?sex=male
                                              http :4000/films/1?sex=female
                                              http :4000/films/1?sort=age_desc
                                              http :4000/films/1?sort=age_asc */

    @Get("/films/:id([0-9]+)")
    async getCharacters(
      @Param('id') id: number,
      @QueryParam('sex') sex: string,
      @QueryParam('sort') sort: string,
      @QueryParam('pageNumber') pageNumber: number
    ) {
      // for pagination
      const pageSize: number = 30
      if (!pageNumber) pageNumber = 1

      //to filter on sex
      if (sex) {
        const charsSex = await Character.createQueryBuilder("character")
          .where("character.film_id = :film_id", { film_id: id })
          .andWhere("character.sex = :sex", {sex: sex})
          .skip((--pageNumber) * pageSize)
          .take(pageSize)
          .getMany()

        if (!charsSex) throw new BadRequestError("Can't find your characters")

        return charsSex
        
        //to sort by height or age
      } if (sort) {
        if (sort === 'height_asc') {
          console.log('HHHHHHHHHHHHHHHHHHHHHHHHH')
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.height", "ASC")
            .skip((--pageNumber) * pageSize)
            .take(pageSize)
            .getMany()
        } else if (sort === 'height_desc') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.height", "DESC")
            .skip((--pageNumber) * pageSize)
            .take(pageSize)
            .getMany()  
        } else if (sort === 'age_asc') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.age", "ASC")
            .skip((--pageNumber) * pageSize)
            .take(pageSize)
            .getMany()
        } else if (sort === 'age_desc') {
          return await Character.createQueryBuilder("character")
            .where("character.film_id = :film_id", { film_id: id })
            .orderBy("character.age", "DESC")
            .skip((--pageNumber) * pageSize)
            .take(pageSize)
            .getMany()  
        } else throw new BadRequestError('Incorrect param passed')

      } else {
      const chars = await Character.createQueryBuilder("character")
        .where("character.film_id = :film_id", { film_id: id })
        .skip((--pageNumber) * pageSize)
        .take(pageSize)
        .getMany()
      if (!chars) throw new BadRequestError("Can't find your characters!")
      return chars
      }
    }

  //Returns planets by climate and all dark haired people from planet
  //If using seed data, best to test with is ====>  http :4000/planets?climate=temperate
    @Get("/planets")
    async getPlanets(
      @QueryParam('climate') climate: string
    ) {
      if (climate) {
        const darkHairChars = await Planet.createQueryBuilder("planet")
          .leftJoinAndSelect("planet.characters", "character", "character.hair_color IN (:...hair_color)", { hair_color: ["brown", "black"] } )
          .where("planet.climate = :climate", { climate: climate })
          .take(30)
          .getMany()
        if (!darkHairChars) throw new BadRequestError("Can't find anything!")
      
        return darkHairChars
      } else throw new BadRequestError('bad search')
      }
  }