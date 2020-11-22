import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      popups: ["aaa"],
    },
    getters: {
        getPopups(state) {
          return state.popups;
        },
    },
    mutations: {
      addPopup(state, payload) {
        [state.popups].push(payload);
      },
      removePopup(state, payload) {
        [state.popups].push(payload);
      },
    },
    actions: {
        addPopup: function(context, payload) {
            //context.commit("addPopup", payload);
        },
        removePopup: function(context, payload) {
            context.commit("removePopup", payload);
        }
    },
})