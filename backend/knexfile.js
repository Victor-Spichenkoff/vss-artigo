// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


// const { db } = require('./.env')
const url = require('./.env').DB_URL

module.exports = {
    client: 'postgresql',
    connection: 'postgres://root:mbsP4I7KqikwPDMuMmgfnZ3wdah977rC@dpg-chohk22k728ivvt35c0g-a.ohio-postgres.render.com/final_dx0m?ssl=true',


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
