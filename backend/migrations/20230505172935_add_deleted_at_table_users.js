
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function(knex, Promise) {
    return knex.schem.alterTable('users', function(table) {
        table.dropColumn('deletedAt')
    })
};
