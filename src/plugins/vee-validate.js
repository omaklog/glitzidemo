import { extend, configure, ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import Vue from 'vue'
import es from 'vee-validate/dist/locale/es.json'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

extend('required', { ...required, message: 'El campo  {_field_} es requerido' })
extend('email', { ...email, message: 'El campo email no tiene el formato correcto' })

const conf = { localize: es }

configure(conf)
