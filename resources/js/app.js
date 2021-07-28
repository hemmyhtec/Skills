/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 require('./bootstrap');

 window.Vue = require('vue').default;
 import Form from 'vform'
 import {
     Button,
     HasError,
     AlertError,
     AlertErrors,
     AlertSuccess
   } from 'vform/src/components/bootstrap5'

 window.form = Form;
 Vue.component(Button.name, Button)
 Vue.component(HasError.name, HasError)
 Vue.component(AlertError.name, AlertError)
 Vue.component(AlertErrors.name, AlertErrors)
 Vue.component(AlertSuccess.name, AlertSuccess)

 import VueRouter from 'vue-router'
 import moment from 'moment';
 import VueProgressBar from 'vue-progressbar'
 import swal from 'sweetalert2'
 window.swal = swal


 const toast = swal.mixin({
     toast: true,
     position: 'top-end',
     showConfirmButton: false,
     timer: 3000,
     timerProgressBar: true,
     didOpen: (toast) => {
       toast.addEventListener('mouseenter', swal.stopTimer)
       toast.addEventListener('mouseleave', swal.resumeTimer)
     }
   })

 window.toast = toast
 window.Fire = new Vue() //For Update

 Vue.use(VueRouter)
 Vue.use(VueProgressBar, options)
 const options = {
     color: '#bffaf3',
     failedColor: '#874b4b',
     thickness: '5px',
     transition: {
       speed: '0.2s',
       opacity: '0.6s',
       termination: 300
     },
     autoRevert: true,
     location: 'left',
     inverse: false
   }

 const routes = [
     { path: '/dashboard', component: require('./components/Dashboard.vue').default},
     { path: '/profile', component: require('./components/Profile.vue').default},
     { path: '/posts', component: require('./components/Posts.vue').default}
 ]

 const router = new VueRouter ({
     mode: 'history',
     routes
 })

//  Vue.filter('upText', function(text){
//      return text.charAt(0).toUpperCase() + text.slice(1);
//  })
 Vue.filter('mydate', function(created){
     return moment(created).format('MMMM DD YYYY')
 })
 /**
  * The following block of code may be used to automatically register your
  * Vue components. It will recursively scan this directory for the Vue
  * components and automatically register them with their "basename".
  *
  * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
  */

 // const files = require.context('./', true, /\.vue$/i)
 // files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

 Vue.component('example-component', require('./components/ExampleComponent.vue').default);

 /**
  * Next, we will create a fresh Vue application instance and attach it to
  * the page. Then, you may begin adding components to this application
  * or customize the JavaScript scaffolding to fit your unique needs.
  */

 const app = new Vue({
     el: '#app',
     router
 });
