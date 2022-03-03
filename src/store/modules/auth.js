import mutations from "@/store/mutations";

import firebase from "@/plugins/firebase";

const { IS_LOGED_IN, LOGIN_LOADER, IS_FIRST_LOGIN } = mutations;

const authStore = {
  namespaced: true,
  state: {
    isLogedIn: Boolean(localStorage.getItem("vue_app_token")),
    loagingInProgress: false,
    isFirstLogin: false,
  },
  getters: {
    isLogedIn: ({ isLogedIn }) => isLogedIn,
    loagingInProgress: ({ loagingInProgress }) => loagingInProgress,
    isFirstLogin: ({ isFirstLogin }) => isFirstLogin,
  },
  mutations: {
    [IS_LOGED_IN](state, bool) {
      state.isLogedIn = bool;
    },
    [LOGIN_LOADER](state, bool) {
      state.loagingInProgress = bool;
    },
    [IS_FIRST_LOGIN](state, bool) {
      state.isFirstLogin = bool;
    },
  },
  actions: {
    setLoggedInState: {
      handler({ commit }, bool) {
        commit(IS_LOGED_IN, bool);
      },
      root: true,
    },

    async login({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGIN_LOADER, true);

        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        dispatch(
          "loadMessage",
          { type: "error", message: err.message },
          { root: true }
        );
        console.log(err);
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },

    async logout() {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        console.log(err);
      }
    },

    async sendPass({ commit, dispatch }, email) {
      try {
        commit(LOGIN_LOADER, true);
        await firebase.auth().sendPasswordResetEmail(email);
        dispatch(
          "loadMessage",
          {
            type: "success",
            message: "the password has been sent check the mail",
          },
          { root: true }
        );
      } catch (err) {
        dispatch(
          "loadMessage",
          { type: "error", message: err.message },
          { root: true }
        );
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },

    async signUp({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGIN_LOADER, true);
        let data = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit(IS_FIRST_LOGIN, data.additionalUserInfo.isNewUser);
      } catch (err) {
        dispatch(
          "loadMessage",
          { type: "error", message: err.message },
          { root: true }
        );
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },
    getUserIdToken: {
      async handler({ dispatch }) {
        try {
          const token = await firebase.auth().currentUser.getIdToken();

          return token;
        } catch (err) {
          dispatch(
            "loadMessage",
            { type: "error", message: err.message },
            { root: true }
          );
        }
      },
      root: true,
    },
  },
};

export default authStore;
