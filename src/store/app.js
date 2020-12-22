import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
      popups: []
    },
    getters: {
      getPopups(state) {
        return state.popups;
      }
    },
    mutations: {
      addPopup(state, payload) {
        state.popups.push(payload);
      },
      removePopup(state, payload) {
        state.popups.splice(payload, 1);
      }
    },
    actions: {
        addPopup: function({commit}, {type, message}) {
            let id = Date.now();
            commit("addPopup", {
              id: id,
              type: type,
              message: message
            })

            if(type !== "wait"){
              new Promise(function(resolve) {
                setTimeout(function(){
                  resolve("removePopup");
                }, 5000);
              }).then(function(removePopupFunc){
                store.dispatch(removePopupFunc, id)
              });
            }else{
              return id;
            }
        },
        removePopup: function({commit}, payload) {
          this.state.popups.map((popup, index) => {
            if(popup.id == payload){
              commit("removePopup", index);
            }
          })
        }
    },
})

export default store;