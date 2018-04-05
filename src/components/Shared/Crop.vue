<template>
  <div class="row">
    <div class="form-group col-xs-12">
      <label for="image">{{ cropTitle }}</label>
      <div class="input-group">
        <div class="input-group-btn">
          <label for="image" class="btn btn-primary"><i class="fa fa-upload"></i> {{ btnUpload }}</label>
        </div>
        <input type="text" class="form-control" v-model="imageUrl" disabled>
        <div class="input-group-btn" v-if="image">
          <button type="button" class="btn btn-danger" @click="clearImage"><i class="fa fa-trash"></i> {{ btnRemove }}</button>
        </div>
      </div>
      <input class="hidden-element" type="file" id="image" @change="previewImage" accept="image/*">
    </div>
    <div class="form-group col-xs-12">
      <label for="image">{{ previewTitle }}</label>
      <div class="input-group form-control preview" :style="{ 'background-image': 'url(' + image + ')' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'cropTitle',
    'btnUpload',
    'btnRemove',
    'previewTitle'
  ],
  data () {
    return {
      imageUrl: null,
      image: null
    }
  },
  methods: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hidden-element {
    display: none;
  }
  .preview {
    height: 385px;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
