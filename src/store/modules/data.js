import { helper } from '../helper'
const state = {
    base: [
        {
            username: "username",
            logged: true,
            labels:[
                {
                    id:0,
                    label:"Let's go",
                    done: false
                },
                {
                    id:1,
                    label:"Let's fucking go",
                    done: true
                }
            ],
        },
        {
            username: "troll",
            logged:false,
            labels:[
                {
                    id:0,
                    label:"Hold on",
                    done: false
                },
                {
                    id:1,
                    label:"What was that!",
                    done: false
                },
            ],
        }
    ],
}
const getters = {
    updateData: (state) => {
        let resolution =undefined;
        state.base.forEach(element => {
            if(element.logged === true ) resolution = element.labels;
        });
        return resolution;
    }
}
const actions = {
    changeAction: function ({commit},payload) {
        commit('changeMutation',payload);
    },
    insertAction: function ({commit},payload) {
        commit('insertMutation',payload);
    },
    checkboxAction: function({commit},payload){
        commit('checkboxMutation',payload);
    }
}
const mutations = {
    changeMutation: function(state,payload){
        let index = helper.UserIndex(state.base);
        state.base[index].labels[payload.id].label = payload.label;
        console.log(state.base);
    },
    insertMutation: function(state,payload){
        let index = helper.UserIndex(state.base);
        helper.IncrementIDs(state.base);
        state.base[index].labels.unshift(payload);
    },
    checkboxMutation: function(state,payload){
        let index = helper.UserIndex(state.base);
        state.base[index].labels[payload.id].done = !(state.base[index].labels[payload.id].done);
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}