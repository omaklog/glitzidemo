<template>
  <div class="profile">
    <div class="profile__container">
      <div class="profile__container__head">
        <div class="profile__container__head--title">
          Completar perfil
        </div>
        <div class="profile__container__head--icon">
          <feather-icon icon="XIcon" size="24"/>
        </div>
      </div>
    </div>
    <BreadCrumbs @setStep="setStep" :option="step"></BreadCrumbs>
    <PersonalInfo v-if="!step" @success="nextStep"></PersonalInfo>
    <ProfessionalInfo v-else></ProfessionalInfo>
  </div>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import PersonalInfo from '@/components/forms/PersonalInfo.vue'
import ProfessionalInfo from '@/components/forms/ProfessionalInfo.vue'

export default {
  data() {
    return {
      step: 0,
    }
  },
  components: {
    ProfessionalInfo,
    PersonalInfo,
    BreadCrumbs,
  },
  methods: {
    setStep(step) {
      this.step = step
    },
    nextStep() {
      this.step = 1
    },
    finishTest() {},
  },
}
</script>

<style lang="scss">
  @import '@/assets/scss/variables/_variables.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
  
  .profile {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    
    &__container {
      width: 320px;
      height: 80px;
      display: flex;
      justify-content: center;
      filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.05));
      margin-left: auto;
      margin-right: auto;
      border-bottom: 2px $background solid;
      
      &__head {
        width: 100%;
        max-width: 320px;
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top: 24px;
        
        &--title {
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          color: $black-text;
        }
        
        &--icon {
          color: $purple-primary;
          position: absolute;
          right: 0;
          margin-right: 16px;
        }
      }
    }
  }
</style>
