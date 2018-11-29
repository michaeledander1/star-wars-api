# star-wars-api

This uses Typescript, Koa, routing-controllers and TypeORM in the backend, utilizing docker and a postgres db.

## Initializing project

1. After cloning, install dependencies with npm install.
2. Run npm run start to create tables in your database from the entity models. **If you encounter errors**,
try commenting out lines 20-24, 49-53, and 80-84, save, and run npm run start again. Then uncomment these lines and save
and it should create the tables fine.
3. You can manually throw some data in your postgres database via a db client like dbeaver.
I have provided a little dummy data in dbSeedData.readme. First insert films, then planets, then characters.
4. To test the endpoints you can use HTTPie (check it out here if you don't know it https://httpie.org/). 
I have provided tests above each endpoint that demonstrate them best with the dummy data provided. 
