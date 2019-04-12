import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./config/router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

new Vue({
  el: "#root",
  //让vue知道我们的路由规则
  router: router, //可以简写router
  render: c => c(App)
});
