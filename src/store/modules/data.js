import { helper } from '../helper'
const state = {
    base: [
        {
            username: "fade.sestan@gmail.com",
            password: "1234",
            logged: true,
            labels:[
                {
                    id: 0,
                    label:"Let's go",
                    done: false,
                    imageURL: null
                },
                {   
                    id:1,
                    label:"Let's fucking go",
                    done: true,
                    imageURL: null
                }
            ],
        },
    ],
}
const getters = {
    updateData: (state) => {
        let resolution =undefined;
        state.base.forEach(element => {
            if(element.logged === true ) resolution = element.labels;
        });
        return resolution;
    },
    allusers: (state) => {
        return state.base;
    },
    activeUser: (state) => {
        let x = helper.ActiveUser(state.base);
        return state.base[x].username;
    },
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
    },
    deleteOneAction: function({commit},payload){
        commit('deleteOneMutation',payload);
    },
    deleteDoneAction: function({commit},payload){
        commit('deleteDoneMutation',payload);
    },
    userAction: function({commit},payload){
        commit('userMutation',payload);
    }
}
const mutations = {
    changeMutation: function(state,payload){
        let x=undefined,index = helper.ActiveUser(state.base);
        x = state.base[index].labels.findIndex(a => a.id === payload.id);
        state.base[index].labels[x].label = payload.label;
        state.base[index].labels[x].imageURL = payload.imageURL;
    },
    insertMutation: function(state,payload){
        let index = helper.ActiveUser(state.base);
        state.base[index].labels.push(payload);
    },
    checkboxMutation: function(state,payload){
        let x=undefined, index = helper.ActiveUser(state.base);
        x = parseInt(helper.findIndex(state.base,payload));
        state.base[index].labels[x].done = !(state.base[index].labels[x].done);
    },
    deleteOneMutation: function(state,payload){
        let x = undefined, index = helper.ActiveUser(state.base);
        x = helper.findIndex(state.base,payload);
        state.base[index].labels.splice(x,1);
    },
    deleteDoneMutation: function(state){
        let x = undefined, index = helper.ActiveUser(state.base);
        x = state.base[index].labels.findIndex(a => a.done === true);
        if( x !== -1) state.base[index].labels.splice(x,1);
    },
    userMutation: function(state,payload){
        if(payload.new === true){
            state.base.push({
                username:payload.username,
                password:payload.password,
                logged:true,
                labels:[],
            });
        helper.ActiveUserChange(state.base,payload);
        } else {
            helper.ActiveUserChange(state.base,payload);
        }
    }     
}
export default {
    state,
    getters,
    actions,
    mutations
}