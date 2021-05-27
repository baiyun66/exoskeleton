import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite'
import patient_info from '../pages/Patient/patient_info'
import patients_list from '../pages/Patient/patients_list'
import eegAssistant from '../pages/eegAssistant/eegAssistant'
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite
    },
    {
      path: '/patient_info/:id',
      component: patient_info
    },
    {
      path: '/patient_list',
      component: patients_list
    },{
      path: '/eeg_assistant',
      component: eegAssistant
    }
  ]
})
