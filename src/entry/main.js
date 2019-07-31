import Vue from "vue";
import Vuex from 'vuex'
import App from "./App";
import Router from "vue-router";
import router from "../router";
import store from  "../store"
Vue.use(Router)
Vue.use(Vuex)
import components from "src/components";
_.each(components,(component)=>{
    Vue.component(component.name, component)
})
window.ly = ly
new Vue({
    el: '#app',
    router: new Router(router),
    store : new Vuex.Store(store),
    render: h => h(App)
})
