<template>
  <div>
    <div class="w-100 mt-2 text-center">
      <label class="personal__label--title">Complete sus datos personales para empezar</label>
    </div>
    <div class="personal__uploader">
      <VueUploadsimpleFile></VueUploadsimpleFile>
    </div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <div class="w-100">
        <label class="label-form">Nombre</label>
        <validation-provider
          #default="{ errors }"
          name="Nombre"
          rules="required"
        >
          <b-form-input
            v-model="personalInfo.name"
            :state="errors.length > 0 ? false:null"
            placeholder="Ingresa tu nombre"></b-form-input>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Apellido</label>
        <validation-provider
          #default="{ errors }"
          name="apellido"
          rules="required"
        >
          <b-form-input v-model="personalInfo.lastName" placeholder="Ingresa tu apelligo"></b-form-input>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Teléfono</label>
        <validation-provider
          #default="{ errors }"
          name="teléfono"
          rules="required"
        >
          <b-form-input v-model="personalInfo.phone" placeholder="Ingresa tu teléfono"></b-form-input>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Email</label>
        <validation-provider
          #default="{ errors }"
          name="email"
          rules="required|email"
        >
          <b-form-input v-model="personalInfo.email" placeholder="Ingresa tu email"></b-form-input>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Género</label>
        <validation-provider
          #default="{ errors }"
          name="género"
          rules="required"
        >
          <b-form-group :state="errors.length > 0 ? false:null">
            <v-select
              @close="validationFormInfo"
              id="gender"
              v-model="personalInfo.gender"
              :options="genders"
              label="text"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              key="id"
              placeholder="Selecciona tu género"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Fecha de nacimiento</label>
        <validation-provider
          #default="{ errors }"
          name="cumpleaños"
          rules="required"
        >
        <b-form-datepicker @hidden="validationFormInfo" v-model="personalInfo.birthday" :state="errors.length > 0 ? false:null" placeholder="DD/MM/AAAA"></b-form-datepicker>
          <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Dirección</label>
        <validation-provider
          #default="{ errors }"
          name="dirección"
          rules="required"
        >
        <b-form-input v-model="personalInfo.address"
                      placeholder="Ej. Valle del Paraiso, 54060 Tlalnepantla de Baz"></b-form-input>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="w-100 mt-1">
        <b-button @click="validationFormInfo" variant="primary" class="w-100"  :disabled="invalid">Próximo</b-button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import VueUploadsimpleFile from '@/components/VueUploadsimpleFile.vue'
import PersonalInfo from '@/models/PersonalInfo'

export default {
  name: 'PersonalInfo',
  data() {
    return {
      personalInfo: new PersonalInfo(),
      genders: [{ id: 0, text: 'Mujer' }, { id: 1, text: 'Hombre' }],
    }
  },
  methods: {
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.observer.validate().then(success => {
          if (success) {
            this.$emit('success')
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
  },
  components: {
    VueUploadsimpleFile,
  },
}
</script>

<style lang="scss">
  @import '@/assets/scss/variables/_variables.scss';

  personal__ {
    &__label--title {
      color: $black-text;
      font-weight: bold;
      margin-bottom: 24px;
    }
    &__uploader {
      align-self: center;
    }
  }

</style>
