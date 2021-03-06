import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from 'typeorm'

/* Ideally this would have included the commented out many to many relational tables.
Unfortunately I was having a very hard time inserting seed data into postgres due to this
relationship, and as the assignment was more about the endpoints, decided to make it to a many to
one relational table. I left the commented out tables for the purpose of possible future improvement */

@Entity()
export class Film extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @Column('text')
  description: string

  @OneToMany(() => (Planet), planet => planet.film)
  planets: Planet[]

  @OneToMany(() => (Character), character => character.film)
  characters: Character[]

  // @ManyToMany(() => Character, (character) => character.films)
  // @JoinTable()
  // public characters: Character[]
  
  // @ManyToMany(() => Planet, (planet) => planet.films)
  // @JoinTable()
  // public planets: Planet[]
}

@Entity()
export class Planet extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @Column('text')
  climate: string

  // @ManyToMany(_ => Film, (film) => film.planets)
  // films: Film[]
  @ManyToOne(() => (Film), film => film.planets)
  film: Film

  @OneToMany(() => (Character), character => character.planet)
  characters: Character[]
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

  @Column('int') 
  height: number

  // @ManyToMany(_ => Film, (film) => film.characters)
  // films: Film[]

  @ManyToOne(() => (Film), film => film.characters)
  film: Film
  
  @ManyToOne(() => (Planet), planet => planet.characters)
  planet: Planet
}

