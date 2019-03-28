import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Seed from './views/Seed.vue';
import Wipe from './views/Wipe.vue';
import StaticWebView from './views/StaticWebView.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/seed/:count',
      name: 'seed',
      component: Seed
    },
    {
      path: '/wipe',
      name: 'wipe',
      component: Wipe
    },
    {
      path: '/static',
      name: 'static',
      component: StaticWebView
    }
  ]
});
