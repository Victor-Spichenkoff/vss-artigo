<!-- Tudo que e do adm -->
<template>
  <div class="admin-pages">
      <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
          sub="Cadastrar, atualizar e visualizar" />
      <div class="admin-pages-tabs">
        nhe
        <b-card>
                 <b-tab title="Categorias" active>
                      nhe
                  </b-tab>
        </b-card>

          <!-- <b-card no-body>
              <b-tabs card>
                  <b-tab title="Artigos" active>
                      <ArticleAdmin />
                  </b-tab>
                  <b-tab title="Categorias">
                      <CategoryAdmin />
                  </b-tab>
                  <b-tab title="Usuários">
                      <UserAdmin />
                  </b-tab>
              </b-tabs>
          </b-card> -->
      </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
  name: 'AdminPages',
  components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin }
}
</script>

<style>

</style>