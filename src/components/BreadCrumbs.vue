<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__action cursor-pointer" @click="setStep(0)">
      <b-button variant="primary" class="breadcrumbs__action--button btn-icon" @click="setStep(0)">
        <feather-icon icon="UserIcon"/>
      </b-button>
      <small class="breadcrumbs__action__label1 text-primary text-bold" @click="setStep(0)">Personal</small>
      <div class="breadcrumbs__action--divider">
        <feather-icon icon="ChevronRightIcon" size="14"/>
      </div>
    </div>

    <div class="breadcrumbs__action">
      <b-button :variant="option ? 'primary' : 'inactive'" class="breadcrumbs__action--button  btn-icon">
        <feather-icon icon="AtSignIcon" size="14"/>
      </b-button>
      <small class="breadcrumbs__action__label2" :class="option ? ' text-primary text-bold' : ''">Profesional</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',

  props: {
    option: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    setStep(step) {
      this.$emit('setStep', step)
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables/_variables.scss';

.breadcrumbs {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  height: 90px;

  &__action {
    display: flex;
    justify-content: center;
    align-items: center;

    &__label1 {
      margin-left: 8px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }

    &__label2 {
      margin-left: 8px;
      font-size: 14px;
      cursor: pointer;
    }

    &--button {
      max-height: 38px;
      margin-left: 8px;

      & btn2 {
        background-color: $grey-text-light !important;
      }
    }

    &--divider {
      display: flex;
      align-items: center;
      color: $grey-text-light;
      margin-left: 8px;
    }
  }
}
</style>
