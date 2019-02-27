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
      <input class="hidden-element" type="file" id="image" @change="onFileChange" accept="image/*">
    </div>
    <div class="form-group col-xs-12">
      <label for="image">{{ previewTitle }}</label>
      <div class="input-group form-control preview-wrap">
        <croppa class="preview" v-model="croppa"
          auto-sizing
          :placeholder="previewTitle"
          :placeholder-font-size="0"
          :disabled="false"
          :disable-drag-and-drop="true"
          :disable-click-to-choose="true"
          :disable-rotation="true"
          :prevent-white-space="true"
          :show-remove-button="false"
          :zoom-speed="5"
          initial-size="cover"
          :initial-image="image"></croppa>
      </div>
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
      image: null,
      croppa: {}
    }
  },
  mounted () {
    let img = new Image()
    this.imageUrl = img.src && img.src !== '' && img.src !== null ? img.src : null
    img.setAttribute('crossorigin', 'anonymous')
    this.image = img.src && img.src !== '' && img.src !== null ? img.src : null
    this.croppa.refresh()
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()
      var input = event.target

      reader.onload = (e) => {
        this.imageUrl = input.value
        this.image = e.target.result
        this.croppa.refresh()
      }
      reader.readAsDataURL(file)
    },
    clearImage: function () {
      this.image = null
      this.imageUrl = null
      document.getElementById('image').value = ''
      this.croppa.refresh()
    },
    getCroppedImage: function () {
      return this.croppa.generateDataUrl()
    },
    getImageName: function () {
      return this.imageUrl.replace(/^.*[\\/]/, '')
    }
  }
}
</script>

<style scoped>
  .hidden-element {
    display: none;
  }
  .preview-wrap {
    padding: 0;
    max-width: 360px;
    height: 360px;
  }
  .croppa-container.preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    margin: 0;
  }
</style>
