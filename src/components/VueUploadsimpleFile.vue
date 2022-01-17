<template>
  <div class="uploader">
    <div class="uploader__avatar--select" @dragover.prevent="dragOver" @dragleave.prevent="dragLeave"
         @drop.prevent="drop($event)">
      <div class="drop" v-show="dropped == 2"></div>
      <!-- Error Message -->
      <div v-show="error" class="error">
        {{ error }}
      </div>
      <!-- To inform user how to upload image -->
      <div v-show="imgs_preview.length === 0" class="beforeUpload">
        <div class="before-upload__container">
          <feather-icon icon="ImageIcon" size="23" class="text-primary"/>
          <input type="file" style="z-index: 1" accept="image/*" ref="uploadInput" @change="previewImgs"/>
        </div>
      </div>
      <div class="imgsPreview" v-show="imgSelected" style="width: 100% !important;">
        <div v-for="(img, i) in imgs_preview" :key="i">
          <b-avatar :src="img" size="71" class="text-right"/>
          <feather-icon icon="XIcon" @click="deleteImg(--i)" class="mx-2 delete" fab dark/>
        </div>
      </div>
    </div>
    <div class="uploader__labels">
      <label class="uploader__labels--title">Personal foto (Opcional)</label>
      <label :class="imgSelected ? '' : 'uploader__labels--subtitle'">Sube tu foto (Formato JPG o PNG max 2MB)</label>
      <label v-if="imgSelected" @click="append" class="text-primary text-bold cursor-pointer">Cambiar foto</label>
    </div>
  </div>

</template>
<script>
import { BAvatar } from 'bootstrap-vue'

export default {
  name: 'VueUploadImages', // vue component name
  components: {
    BAvatar
  },
  data() {
    return {
      error: '',
      files: [],
      dropped: 0,
      imgs_preview: [],
      important: 1,
    };
  },
  computed: {
    imgSelected() {
      return this.files.length > 0
    },
  },
  props: {
    max: Number,
    uploadMsg: String,
    maxError: String,
    fileError: String
  },
  methods: {
    dragOver() {
      this.dropped = 2
    },
    dragLeave() {
    },
    drop(e) {
      let status = true
      e.dataTransfer.files.forEach(file => {
        if (file.type.startsWith('image') === false) status = false
      })
      if (status === true) {
        if (this.$props.max && e.dataTransfer.files.length + this.files.length > this.$props.max) {
          this.error = this.$props.maxError ? this.$props.maxError : `Maximo de archivos es ${this.$props.max}`
        } else {
          this.files.push(...e.dataTransfer.files);
          this.previewImgs()
        }
      } else {
        this.error = this.$props.fileError ? this.$props.fileError : 'Tipo de archivo no soportado'
      }
      this.dropped = 0
    },
    append() {
      this.$refs.uploadInput.click()
    },
    readAsDataURL(file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => { resolve(fr.result) }
        fr.onerror = function () { reject(fr) }
        fr.readAsDataURL(file)
      })
    },
    deleteImg(index) {
      this.imgs_preview.splice(index, 1)
      this.files.splice(index, 1)
      this.$emit('change', this.files)
      this.$refs.uploadInput.value = null
    },
    clearTempPhotos() {
      this.imgs_preview = []
    },
    previewImgs(event) {
      if (this.$props.max && event && event.currentTarget.files.length + this.files.length > this.$props.max) {
        this.error = this.$props.maxError ? this.$props.maxError : `Número máximo de archivos es ${this.$props.max}`
        return
      }
      if (this.dropped === 0) {
        if (event.currentTarget.files.length) {
          this.files = []
          this.imgs_preview = []
        }
        this.files.push(...event.currentTarget.files)
      }
      this.error = ''
      this.$emit('change', this.files)
      let readers = []
      if (!this.files.length) return
      for (let i = 0; i < this.files.length; i++) {
        readers.push(this.readAsDataURL(this.files[i]))
      }
      Promise.all(readers).then(values => {
        this.imgs_preview = values
      })
    },
    setImportant(event) {
      this.important = event
    },
  },
}
</script>

<style lang="scss">
  @import '../assets/scss/variables/_variables.scss';

  .uploader {
    display: flex;
    justify-content: space-between;

    &__avatar--select {
      width: 70px;
      height: 70px;
      display: flex;
      flex-flow: wrap;
    }

    &__labels {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 16px;

      &--title {
        font-size: 12px;
        font-weight: bold;
        color: $grey-text;
        line-height: 15px;
      }

      &--subtitle {
        margin-top: 9px;
        font-size: 10px;
        font-weight: bold;
        color: $purple-primary;
        line-height: 12px;
      }
    }
  }
  
  .img-preview {
    border-radius: 6px !important;
    -moz-box-shadow: 5px 4px 4px -5px rgba(0, 0, 0, 0.75);
    border-radius: 6px;
    border: 1px black solid;
  }
  
  .item__photo {
    width: 90px;
    height: 90px;
    position: relative;
  }
  
  .drop {
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 10px;
    position: absolute;
    background-color: #f4f6ff;
    left: 0;
    border: 3px dashed #a3a8b1;
  }
  
  .beforeUpload {
    position: relative;
    text-align: center;
    width: 100%;
    border: 2px solid $purple-primary;
    background: $purple-primary-opacity;
    border-style: dashed;
    border-radius: 50%;
  }
  
  .beforeUpload input {
    width: 100%;
    margin: auto;
    height: 100%;
    opacity: 0;
    position: absolute;
    background: red;
    display: block;
  }
  
  .beforeUpload input:hover {
    cursor: pointer;
  }
  
  .beforeUpload .icon {
    width: 150px;
    margin: auto;
    display: block;
  }
  
  .before-upload__container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  
  .imageHolder {
    -webkit-box-shadow: 5px 4px 4px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 4px 4px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 4px 4px -5px rgba(0, 0, 0, 0.75);
    border-radius: 6px;
  }
  
  
  .imgsPreview .imageHolder {
    width: 150px;
    height: 150px;
    background: #fff;
    position: relative;
    border-radius: 10px;
    margin: 5px 5px;
    display: flex;
  }
  
  .imgsPreview .imageHolder img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  
  .important {
    border: 1px #a1a1a1 solid;
    background: #ffffff;
  }
  
  .delete {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 36px;
    height: 36px;
    color: #fff;
    border: 1px transparent solid;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 50%;
  }
  
  .imgsPreview .imageHolder {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 29px;
    height: 29px;
    color: #fff;
    background: red;
    border-radius: 50%;
  }
  
  .imgsPreview .imageHolder .delete:hover {
    cursor: pointer;
  }
  
  .imgsPreview .imageHolder .delete .icon {
    width: 66%;
    height: 66%;
    display: block;
    margin: 4px auto;
  }
  
  .imgsPreview .imageHolder .plus {
    color: #2d3748;
    background: #f7fafc;
    border-radius: 50%;
    font-size: 21pt;
    height: 30px;
    width: 30px;
    text-align: center;
    border: 1px dashed;
    line-height: 23px;
    position: absolute;
    right: -42px;
    bottom: 43%;
  }
  
  .plus:hover {
    cursor: pointer;
  }
  
  .icon-cloud {
    position: absolute;
    left: 10px
  }
  
  .mainMessage {
    margin-bottom: 0px !important;
  }
</style>
