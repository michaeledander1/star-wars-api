import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from 'typeorm'

@Entity()
export class Film extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @Column('text')
  description: string

  @ManyToMany(() => Character, (character) => character.films)
  @JoinTable()
  public characters: Character[]
  
  @ManyToMany(() => Planet, (planet) => planet.films)
  @JoinTable()
  public planets: Planet[]
}

@Entity()
export class Character extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @Column('text')
  sex: string

  @Column('text')
  hairColor: string

  @Column('int')
  age: number

  @ManyToMany(_ => Film, (film) => film.characters)
  films: Film[]

  @ManyToMany(() => (Planet), planet => planet.characters)
  planets: Planet[]
}

@Entity()
export class Planet extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @Column('text')
  description: string

  @Column('text')
  climate: string

  @ManyToMany(_ => Film, (film) => film.planets)
  films: Film[]

  @ManyToMany(_ => Character, (character) => character.planets)
  @JoinTable()
  characters: Character[]
}