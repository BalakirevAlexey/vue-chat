import mutations from "../mutations";

const { SHOW_NOTIFY } = mutations;

const notifyStore = {
  state: {
    massagePool: [],
  },
  getters: {
    lastMessage: ({ massagePool }) => massagePool[massagePool.length - 1],
  },
  mutations: {
    [SHOW_NOTIFY](state, msg) {
      state.massagePool.push(msg);
    },
  },
  actions: {
    loadMessage({ commit }, msg) {
      commit(SHOW_NOTIFY, msg);
    },
  },
};

export default notifyStore;
