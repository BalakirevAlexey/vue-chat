import Vue from "vue";
import Vuex from "vuex";
import authGuard from "@/guards/auth.guard";
import firebase from "@/plugins/firebase";

import auth from "@/store/modules/auth";
import notify from "@/store/modules/notify";
import user from "@/store/modules/user";
import chats from "@/store/modules/chats";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},

  modules: {
    auth,
    notify,
    user,
    chats,
  },
});

firebase.auth().onAuthStateChanged(async (userData) => {
  store.dispatch("setLoggedInState", Boolean(userData));
  store.dispatch("setUserState", userData);

  console.log("onAuthStateChanged", userData);

  if (userData) {
    const token = await store.dispatch("getUserIdToken");
    localStorage.setItem(process.env.VUE_APP_LS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(process.env.VUE_APP_LS_TOKEN_KEY);
  }
});

authGuard(store);

export default store;
