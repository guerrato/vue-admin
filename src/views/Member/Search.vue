<template>
  <div>
    <section class="content-header">
      <h1>
        Members
        <small>Novo membro - Busca prévia</small>
      </h1>
    </section>

    <section class="content">
      <div class="callout callout-warning">
        <h4>Antes de Adicionar...</h4>
        Antes de incluir um novo membro, certifique-se que da existência do cadastro através da pesquisa pelo <strong>Nome</strong> ou <strong>Apelido</strong>. <br><br>
        <router-link to="/help/searchmember">Para saber mais da importância dessa etapa, clique aqui.</router-link>
      </div>
      <div class="row">
        <div class="col-md-12">
          <v-box>
            <label for="search">Nome ou Apelido:</label>
            <div class="input-group">
              <input type="text" class="form-control" id="search" v-model="search" placeholder="Membro" @keyup="getParameter()" @change="getParameter()"/>
              <div class="input-group-btn">
                <button type="button" class="btn btn-primary" @click="searchMembers()"><i class="fa fa-fw fa-search"></i></button>
              </div>
              <!-- /btn-group -->
            </div>
          </v-box>
        </div>
      </div>
      <div v-if="this.search !== null" class="row">
        <div class="col-md-12">
          <v-box>
            <v-table id="dtmembers" :columns="columns" :rows="searched_members" :options="options"></v-table>
            <div class="box-footer">
              <router-link class="btn btn-default" to="/member">Voltar</router-link>
              <router-link class="btn btn-primary pull-right" to="/member/create">Adicionar um novo</router-link>
            </div>
          </v-box>
        </div>
      </div>
      <v-modal id="search-modal" :modalTitle="modalTitle" :modalLinkText="modalLinkText" :modalLink="modalLink" v-if="showModal" @close="showModal = false">
        <v-member :id="selectedMember"></v-member>
      </v-modal>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: null,
      lastSearch: '',
      debounceTimeout: null,
      columns: [
        {
          data: 'id',
          title: 'ID',
          width: '5%',
          orderable: false
        },
        {
          data: 'name',
          title: 'Nome',
          width: '50%',
          orderable: false
        },
        {
          data: 'nickname',
          title: 'Apelido',
          orderable: false
        },
        {
          data: 'percentage',
          title: 'percentage',
          visible: false,
          orderable: false,
          // sortable: true,
          searchable: false,
          type: 'num'
        },
        {
          data: 'actions',
          title: '',
          orderable: false
        }
      ],
      options: {
        searching: true,
        paging: true,
        lengthChange: true,
        ordering: true,
        info: true,
        autoWidth: true,
        order: [[ 3, 'desc' ]]
      },
      showModal: false,
      modalLink: '',
      modalLinkText: 'Adicionar Este',
      modalTitle: '',
      selectedMember: null
    }
  },
  computed: {
    searched_members () {
      return this.handleDt()
    }
  },
  mounted () {
    const self = this
    $(document).on('click', '.btn-dt-modal', function (e) {
      self.showModal = true
      self.modalLink = `/member/role/${$(this).data('member-id')}`
      self.selectedMember = $(this).data('member-id')
    })
  },
  methods: {
    searchMembers () {
      if (!this.search || this.search === null) {
        this.search = null
        return false
      }

      if (this.search.toLowerCase() === this.lastSearch.toLowerCase()) {
        return false
      }

      this.lastSearch = this.search.toLowerCase()

      this.$store.dispatch('searchMembers', { query: this.search })
    },
    getParameter () {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(this.searchMembers, 500)
    },
    handleDt () {
      let result = []
      let data = this.$store.getters.searchedMbers

      data.forEach(el => {
        result.push({
          id: el.id,
          name: el.name,
          nickname: el.nickname,
          percentage: el.percentage,
          actions: `<span class="text-center btn-block"><button type="button" class="btn btn-sm btn-primary btn-dt-modal" data-member-id="${el.id}" data-member-name="${el.name}">Mais Informações</button></span>`
        })
      })

      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
