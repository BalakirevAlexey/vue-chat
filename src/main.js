import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import SocketPlugin from "./plugins/socket";

import router from "./router";

import "@/plugins/element-ui";

Vue.config.productionTip = false;

Vue.use(
  new SocketPlugin({
    url: process.env.VUE_APP_SOCKET_URL,
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
