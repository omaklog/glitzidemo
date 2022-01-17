import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import { BButton, BFormInput, BFormDatepicker, BFormGroup, BFormInvalidFeedback, BFormTextarea, BFormCheckbox } from 'bootstrap-vue'
import vSelect from 'vue-select'

Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('b-form-group', BFormGroup)
Vue.component('b-form-input', BFormInput)
Vue.component('b-form-datepicker', BFormDatepicker)
Vue.component('b-button', BButton)
Vue.component('v-select', vSelect)
Vue.component('b-form-invalid-feedback', BFormInvalidFeedback)
Vue.component('b-form-textarea', BFormTextarea)
Vue.component('b-form-checkbox', BFormCheckbox)
