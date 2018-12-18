<template>
  <div>
    <section class="content-header">
      <h1>
        Membros
        <small>Novo membro</small>
      </h1>
    </section>

    <section class="content">
      <v-box>
        <v-alert title="Erros!" type="danger" dismissible v-if="errors.length">
          Por favor, corrija os seguintes erros:
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </v-alert>
        <form @submit="submitForm">
          <div class="box-body">
            <div class="form-group col-md-6">
              <label for="name">Nome Completo:</label>
              <input type="text" class="form-control" id="name" v-model="name" placeholder="Nome">
            </div>
            <div class="form-group col-md-6">
              <label for="email">E-mail:</label>
              <input type="email" class="form-control" id="email" v-model="email" placeholder="alguem@exemplo.com">
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="form-group col-md-6 col-lg-4">
                  <label for="nickname">Apelido:</label>
                  <input type="text" class="form-control" id="nickname" v-model="nickname" placeholder="Nome">
                </div>
                <div class="form-group col-md-6 col-lg-4">
                  <label for="birthdate">Nascido em:</label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="birthdate" v-model="birthdate" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask>
                  </div>
                </div>
                <div class="form-group col-md-6 col-lg-4">
                  <label>Gênero:</label>
                  <select class="form-control select2" id="gender" v-model="gender" data-value="" style="width: 100%;" data-placeholder="Selecione...">
                    <option value="male">Masculo</option>
                    <option value="female">Feminino</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Telefone:</label>
                  <input type="text" class="form-control" id="phone" v-model="phone" placeholder="Telefone">
                </div>
                <div class="form-group col-md-6">
                  <label for="name">WhatsApp:</label>
                  <input type="text" class="form-control" id="whatsapp" v-model="whatsapp" placeholder="WhatsApp">
                </div>
                <div class="form-group col-xs-12">
                  <label for="name">Facebook:</label>
                  <input type="text" class="form-control" id="facebook" v-model="facebook" placeholder="Facebook">
                </div>
                <div class="form-group col-md-6">
                  <label>Responsabilidade:</label>
                  <select class="form-control select2" id="role" v-model="role" data-value="" style="width: 100%;" data-placeholder="Selecione...">
                    <option value="member">Membro</option>
                    <option value="coordinator">Coordenador</option>
                    <option value="administator">Administrador</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label>Status:</label>
                  <select class="form-control select2" id="status" v-model="status" data-value="" style="width: 100%;" data-placeholder="Selecione...">
                    <option value="activated">Ativo</option>
                    <option value="traveling">Viajando</option>
                    <option value="transfered">Transferido</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <v-crop crop-title="Picture" btn-upload="Choose pic" btnRemove="Remove Pic" previewTitle="Preview"></v-crop>
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-primary pull-right">Salvar</button>
          </div>
        </form>
      </v-box>
    </section>
  </div>
</template>

<script>
$(function () {
  $('.select2').select2().on('select2:select', function (e) {
    $(e.currentTarget).attr('data-value', $(e.currentTarget).val())
  })

  $('#birthdate').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
})

export default {
  data () {
    return {
      errors: [],
      name: null,
      email: null,
      nickname: null,
      birthdate: null,
      gender: null,
      phone: null,
      whatsapp: null,
      facebook: null,
      role: null,
      status: null,
      imageUrl: null,
      image: null
    }
  },
  methods: {
    checkForm: function (e) {
      this.gender = $('#gender').attr('data-value')
      this.role = $('#role').attr('data-value')
      this.status = $('#status').attr('data-value')

      if (this.name && this.gender && this.roles && this.statuss) {
        return true
      }

      this.errors = []

      if (!this.name) {
        this.errors.push('Nome requerido.')
      }

      if (!this.gender) {
        this.errors.push('Gênero requerido.')
      }

      if (!this.role) {
        this.errors.push('Responsabilidade requerido.')
      }

      if (!this.status) {
        this.errors.push('Status requerido.')
      }

      e.preventDefault()
    },
    submitForm (e) {
      // if (!this.checkForm(e)) {
      //   return
      // }

      e.preventDefault()
      // const memberData = {
      //   name: this.name,
      //   email: this.email,
      //   nickname: this.nickname,
      //   birthdate: this.birthdate,
      //   gender: this.gender,
      //   phone: this.phone,
      //   whatsapp: this.whatsapp,
      //   facebook: this.facebook,
      //   role: this.role,
      //   status: this.status,
      //   imageUrl: this.imageUrl,
      //   image: this.image
      // }

      console.log(this.$store.dispatch('loadMembers'))
      // this.$store.dispatch('createMember', memberData)
      // this.$router.push('/member')
    },
    previewImage: function (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageUrl = input.value
          this.image = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    clearImage: function () {
      this.image = null
      this.imageUrl = null

      return false
    }
  }
}
</script>
