module.exports = {//subcategories = categoria temporaria
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) as (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories

    `//? = parametro passado no app.db(asnak, parametro)
}