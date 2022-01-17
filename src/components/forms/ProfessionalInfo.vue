<template>
  <div class="professional">
    <div class="w-100 text-center">
      <label class="text-bold professional__title">Complete sus datos profesionales para empezar</label>
    </div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <div class="w-100">
        <label class="label-form">Área</label>
        <validation-provider
          #default="{ errors }"
          name="area"
          rules="required"
        >
          <b-form-group :state="errors.length > 0 ? false:null">
            <v-select
              @close="validationFormInfo"
              id="area"
              v-model="professionalInfo.area"
              :options="areas"
              label="text"
              key="id"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Profesión</label>
        <validation-provider
          #default="{ errors }"
          name="profesion"
          rules="required"
        >
          <b-form-group :state="errors.length > 0 ? false:null">
            <v-select
              @close="validationFormInfo"
              id="profesion"
              v-model="professionalInfo.proffesion"
              :options="professions"
              label="text"
              key="id"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Especialidad</label>
        <validation-provider
          #default="{ errors }"
          name="especialidad"
          rules="required"
        >
          <b-form-group :state="errors.length > 0 ? false:null">
            <v-select
              @close="validationFormInfo"
              id="especialidad"
              multiple
              v-model="professionalInfo.especiality"
              :options="specialitys"
              label="text"
              key="id"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Zona de atendimiento (Opcional)</label>
        <b-form-input v-model="professionalInfo.atentionZone"/>
      </div>
      <div class="w-100">
        <label class="label-form">Descripción (Opcional)</label>
        <b-form-textarea
          v-model="professionalInfo.description"
          id="textarea-default"
          placeholder="Describe tu trabajo aquí"
          rows="3"
        />
      </div>
      <div class="w-100">
        <label class="label-form">Mi URL</label>
        <validation-provider
          #default="{ errors }"
          name="dirección"
          rules="required"
        >
          <b-form-input v-model="professionalInfo.url"/>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="w-100">
        <label class="label-form">Instagram (Opcional)</label>
        <validation-provider
          #default="{ errors }"
          name="dirección"
          rules="required"
        >
          <b-form-input v-model="professionalInfo.instagram"/>
          <small class="text-danger">{{ errors[0] }}</small>
          <b-form-checkbox
            checked="true"
            name="check-button"
            switch
            inline
          >
            Importar fotos de Instagram
          </b-form-checkbox>
        </validation-provider>
      </div>
      <div class="w-100 professional__finish">
        <b-button @click="validationFormInfo" variant="primary" class="w-100" :disabled="invalid">Finalizar
        </b-button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import ProfessionalInfo from '@/models/ProfessionalInfo'


export default {
  name: 'ProfesionalInfo',
  data() {
    return {
      professionalInfo: new ProfessionalInfo(),
      areas: [{id: 0, text: 'Bienestar'}, {id: 1, text: 'Spa'}, {id: 1, text: 'Bodas'}],
      professions: [{id: 0, text: 'Masajista'}, {id: 1, text: 'Quiropactico'}, {id: 2, text: 'Fisio'}, {
        id: 3,
        text: 'Estilista'
      },],
      specialitys: [{id: 0, text: 'Descontracturante'}, {id: 1, text: 'Facial'}, {id: 2, text: 'Peinado'}],
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
}
</script>

<style lang="scss">
  @import '@/assets/scss/variables/_variables.scss';

  .professional {
    &__title {
      font-size: 12px;
    }
    &__finish{
      margin-top: 16px;
    }
  }
</style>