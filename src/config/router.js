const home = r =>
  require.ensure([], () => r(require("../page/home/index.vue")), "home");
const shop = r =>
  require.ensure([], () => r(require("../page/shop/index.vue")), "shop");
import App from "../App.vue";
export default [
  {
    path: "/",
    component: App, //顶层路由，对应index.html
    children: [
      //二级路由。对应App.vue
      {
        path: "",
        redirect: "/home"
      },
      {
        path: "/home",
        component: home
      },
      {
        path: "/shop",
        component: shop
      }
    ]
  }
];
