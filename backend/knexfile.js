// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


// const { db } = require('./.env')
const url = require('./.env').DB_URL
const urlLocal = require('./.env').db1

module.exports = {
    client: 'postgresql',
    //esse é o ultimo a usar:
    // connection: 'postgres://root:mbsP4I7KqikwPDMuMmgfnZ3wdah977rC@dpg-chohk22k728ivvt35c0g-a.ohio-postgres.render.com/final_dx0m?ssl=true',

    //local:
    // connection: urlLocal,
    //pelo vercel:
    connection: "postgres://default:vfaNtnmFK83l@ep-jolly-salad-45432948.us-east-2.postgres.vercel-storage.com:5432/verceldb?ssl=true",





  //   connection: /*db*/{
  //     server: 'postgres://root:mbsP4I7KqikwPDMuMmgfnZ3wdah977rC@dpg-chohk22k728ivvt35c0g-a.ohio-postgres.render.com/final_dx0m',
  //     database: 'final_dx0m',
  //     port: '5432',
  //     user: 'root',
  //     password: 'mbsP4I7KqikwPDMuMmgfnZ3wdah977rC'
  // },

  
    // connection: {
    //   database: 'postgres',
    //   user:     'postgres',
    //   password: 'pituca'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    // connectionTimeout: 30000,
    // options: {
    //   encrypt: true
    // }
};
