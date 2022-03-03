import mutations from "../mutations";
import axios from "@/plugins/axios";
import firebase from "@/plugins/firebase";

const { USER } = mutations;

const userStore = {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    user: ({ user }) => user,
    fullName: ({ user }) => `${user.firstName || ""} ${user.lastName || ""}`,
  },
  mutations: {
    [USER](state, obg) {
      state.user = obg;
    },
  },
  actions: {
    setUserState: {
      handler(store, user) {
        store.dispatch("getUser", user.email);
      },
      root: true,
    },
    async getUser({ commit }, email) {
      try {
        let { data } = await axios.get(`/users/${email}`);
        commit(USER, data);
      } catch (error) {
        console.log(error);
      }
    },
    async createUserInfo({ dispatch }, data) {
      try {
        await axios.post("/users", data);

        dispatch(
          "loadMessage",
          {
            type: "success",
            message: "Your data has been successfully updated",
          },
          { root: true }
        );
      } catch (err) {
        dispatch(
          "loadMessage",
          { type: "error", message: err.message },
          { root: true }
        );
      }
    },

    async checkCurrentPass({ commit, dispatch }, currPass) {
      try {
        commit("auth/LOGIN_LOADER", true, { root: true });

        const user = firebase.auth().currentUser;

        const credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          currPass
        );
        const cred = await user.reauthenticateWithCredential(credential);
        return Boolean(cred);
      } catch (err) {
        dispatch(
          "loadMessage",
          { type: "error", message: err.message },
          { root: true }
        );
      } finally {
        commit("auth/LOGIN_LOADER", false, { root: true });
      }
    },

    async updatePassword({ commit, dispatch }, pass) {
      try {
        const user = firebase.auth().currentUser;

        await user.updatePassword(pass);

        dispatch(
          "loadMessage",
          {
            type: "success",
            message: "Password has been successfully updated",
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
        commit("auth/LOGIN_LOADER", false, { root: true });
      }
    },
  },
};

export default userStore;
