<template>
  <div class="member-details" :id="id">
    <div class="row">
      <!-- <div class="box box-widget bg-navy widget-user-2"> -->
      <div class="member-head bg-navy">
        <img :src="this.image === null ? '/img/default-50x50.gif' : this.image" width="128" height="128" alt="User Avatar">
        <div class="member-name">
          <h3 class="widget-user-username">{{ this.name }}</h3>
          <h5 class="widget-user-desc">{{ this.nickname }}</h5>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="box-body">
          <dl class="dl-horizontal">
            <dt>Nome Completo:</dt>
            <dd>{{ this.name }}</dd>
            <dt>Apelido:</dt>
            <dd>{{ this.nickname }}</dd>
            <dt>E-mail:</dt>
            <dd>{{ this.email }}</dd>
            <dt>Data de Nascimento:</dt>
            <dd>{{ this.birthdate }}</dd>
            <dt>Genero:</dt>
            <dd>{{ this.gender }}</dd>
            <dt>Telefone:</dt>
            <dd>{{ this.phone }}</dd>
            <dt>Whatsapp</dt>
            <dd>{{ this.whatsapp }}</dd>
            <dt>Facebook</dt>
            <dd>{{ this.facebook }}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['id'],
  data () {
    return {
      name: null,
      email: null,
      nickname: null,
      birthdate: null,
      gender: null,
      phone: null,
      whatsapp: null,
      facebook: null,
      image: null
    }
  },
  watch: {
    member (val, original) {
      this.name = val.name
      this.email = val.email
      this.nickname = val.nickname
      this.birthdate = val.birthdate
      this.gender = val.gender
      this.phone = val.phone
      this.whatsapp = val.whatsapp
      this.facebook = val.facebook
      this.image = val.image

      if (val.image) {
        this.image = `${process.env.VUE_APP_IRONHAND_BASE_URL}/storage${val.image}`
      }
    }
  },
  created () {
    this.$store.dispatch('getMember', { id: this.id })
  },
  computed: {
    ...mapState(['member'])
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .modal-body {
    padding-top: 0;
    .member-details {
      .member-head {
        border-radius: 0;
        .member-name {
          display: inline-block;
          vertical-align: middle;
          h3, h5 {
            margin: 10px 0 10px 5px;
          }

        }
        .widget-user-header {
          border-top-right-radius: 0;
          border-top-left-radius: 0;
        }
      }
    }
  }
</style>
