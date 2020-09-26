<template>
  <div class="main">
      <div v-if="controllerAvatar===true" class="shadow" @click="controllerAvatar=false"></div>
    <div class="header">
        <div class="first"></div>
        <div class="logo"><img src="../assets/logo.png" alt="logo"></div>
        <div class="user-menu" v-bind:class="{ clickedAvatar: controllerAvatar }" @click="controllerAvatar = !controllerAvatar;controllerLogout = true">
            <div class="user">{{user}}</div>
            <div class="avatar"><img src="../assets/avatar.png" alt="avatar"></div>
        </div>
        <div class="last"></div>
    </div>
    <div class="info">
        <h4>Manage your to do list</h4>
        <p>click on checkbox or drag and drop to done</p>
    </div>
    <div class="dropdown" v-bind:class="{ show: controllerAvatar, hide: !controllerAvatar }">
            <div v-if="!mobile" class="notMobile" @click="logout">
                <img src="../assets/logout.png" alt="">
                <div>Log out</div>
            </div>
            <div v-if="mobile" class="Mobile">
                <div>
                    <div><img src="../assets/avatar.png" alt="avatar"></div>
                    <div>{{user}}</div>
                </div>
                <div></div>
                <div @click="logout">
                    <img src="../assets/logout.png" alt="logout">
                    <div>Log out</div>
                </div>
            </div>
    </div>
    <div class="todo">
        <div v-if="controllerDragging.todo" class="showAtdragging" @drop='onDrop($event,false)' @dragover.prevent @dragenter.prevent>
            <img src="../assets/drop.png" alt="Drophere">
            <div>Drop Here</div>    
        </div> 
        <div v-if="!controllerDragging.todo" class="todo-header noselect" >
            To-do list
            <div class="todo-adder noselect" @click="controllerNewCard = true">+</div>
        </div>
        <card v-if="controllerNewCard" :text="empty" :insertion="controllerNewCard" @inserted="ListenChildResponse"/>
        <card v-for="item in sort(items,false)" :key="item.id" :id="item.id" :text="item.label" :done="item.done" :imgURL="item.imageURL" @dragging="dragDisplay"/>
    </div>
    <div class="done">
        <div v-if="controllerDragging.done" class="showAtdragging" @drop='onDrop($event,true)' @dragover.prevent @dragenter.prevent>
            <img src="../assets/drop.png" alt="Drophere">
            <div>Drop Here</div>    
        </div> 
        <div v-if="!controllerDragging.done" class="done-header noselect">
            Done list
            <div class="done-remover noselect"><img src="../assets/delete all.png" alt="delete all" @click="EmitdeleteALLDone('deleteDone',true)"></div>
        </div>
        <card v-for="item in sort(items,true)" :key="item.id" :id="item.id" :text="item.label" :done="item.done" :imgURL="item.imageURL" @dragging="dragDisplay"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
Vue.directive('click-outside',{
    bind: function(el,binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if(!(el == event.target || el.contains(event.target))){
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click',el.clickOutsideEvent)
    },
    unbind: function(el){
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
})
import { mapActions, mapGetters } from 'vuex';
import { EventBus } from '../main';
import card from '../components/card';
export default {
  name: 'MainPanel',
  components:{
      card,
  },
  data:function(){
      return{
        empty: '',
        controllerNewCard: false,
        controllerAvatar:false,
        controllerDots:false,
        controllerDragging: {
            todo: false,
            done: false,
        },
        mobile:false,
        controllerLogout:false,
        clickedOutside:false,
      }
    },
  computed: {
      ...mapGetters({
          items: 'updateData',
          user: 'activeUser'
      }),
  },
  methods:{
      ...mapActions({
          callcheckboxMutation:'checkboxAction'
      }),
      hide(){
          this.controllerNewCard = false;
      },
      ListenChildResponse(value){
          this.controllerNewCard = value;      
      },
      EmitdeleteALLDone(name,params){
          EventBus.$emit(name, params);
          params = false;
      },
      sort(arr,arg){
          let newArr=[]
          arr.forEach(element => {
              if(element.done === arg) newArr.push(element);
          });
          return newArr.reverse();
      },
      //Drag and drop methods
    onDrop (evt,state) {
        const itemID = evt.dataTransfer.getData('itemID')
        let index = this.items.findIndex(a=> a.id == parseInt(itemID));
        let item = this.items[index];
        this.callcheckboxMutation({
            id:item.id,
            done:state,
        });
        this.controllerDragging.todo = false
        this.controllerDragging.done = false
    },
    dragDisplay(val1,val2){
        if(val1 == false) {
            this.controllerDragging.todo = false
            this.controllerDragging.done = false
        }
        else if(val2 == true){
            this.controllerDragging.todo = val1;
        }else this.controllerDragging.done = val1;
    },
    logout(){
        this.$router.push('/login');
    },
    detectMobile(){
        this.mobile = !(typeof window.orientation == 'undefined')
    },
    checkOutside(){
        this.controllerAvatar=false;
        this.controllerLogout=false;
    }
  },
  mounted(){
      let DnDMobile = document.createElement('script')
      DnDMobile.setAttribute('src','scripts/DragDropTouch.js')
      document.head.appendChild(DnDMobile);
      this.detectMobile()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
    min-height:100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 20vw repeat(2,1fr) 20vw;
    grid-template-rows: 10vh 10vh auto;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-items: start;
}
.shadow{
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.217);    
}
.header { 
    grid-area: 1 / 1 / 1 / 5;
    align-self: stretch;
    background-color: rgb(216, 215, 215);
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
}
.first{
    flex-basis:20%;
}
.logo{
    display: flex;
    align-self: center;
    justify-self: start;
    flex:20;
}
.logo > img{
    height: 35px;
}
.user-menu{
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex:auto;
    cursor:pointer;
}
.user{
    color: rgb(90, 90, 90);
    font-weight: bold;
    align-self: center;
    padding-right: 1vw;
}
.avatar{
    background-color:rgb(194, 192, 192);
    border-radius: 50%;
    width: 25px;
    border: 1px solid rgb(142, 142, 142);
    padding:8px;
    align-self: center;
    margin-right: 1vw;

}
.avatar > img {
    height: 20px;
}
.last{
    flex-basis:20vw;
}
.dropdown{
    grid-area: 2 / 3 / 2 / 4;
    text-align: left;
    justify-self: end;
    display: flex;
    flex-direction: row;
    background-color: white;
    -webkit-box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    -moz-box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    border-radius: 5px;
    cursor: pointer;
}
.dropdown > div.notMobile{
    padding: 1.5vh;
    width: 10vw;
    display:flex;
    flex-direction: row;
    justify-content: center;
    color:gray;
    font-weight: bold;
}
.dropdown > div:first-child > img{
    align-self: center;
    height: 20px;
    margin-right: 1vw;
}
.clickedAvatar {
    background-color:rgb(202, 202, 202);
}
.info{
    grid-area: 2 / 2 / 2 / 5;
    text-align: left;
    align-self: center;
}
.info > p {
    color: grey;
}
.todo { 
    grid-area: 3 / 2 / auto / 3;
    background-color: rgb(216, 215, 215);
    border-radius: 10px;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
}
.todo-header{
    margin: 10px;
    padding: 25px;
    font-size: 17pt;
    font-weight: bolder;
    border-bottom: 1px solid rgba(155, 155, 155, 0.571);
    text-align: left;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
}
.todo-adder{
    text-align: center;
    vertical-align: middle;
    line-height: 24px;  
    height: 24px;
    width: 26px;
    border-radius: 50%;
    background-color:rgb(194, 192, 192);
    cursor: pointer;
}
.done { 
    grid-area: 3 / 4 / auto / 3;
    background-color: rgb(216, 215, 215);
    border-radius: 10px;
    margin-left: 25px;
    display: flex;
    flex-direction: column;
}
.done-header{
    margin: 10px;
    padding: 25px;
    font-size: 17pt;
    font-weight: bolder;
    border-bottom: 1px solid rgba(155, 155, 155, 0.571);
    text-align: left;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
}
.done-remover{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 26px;
    border-radius: 50%;
    background-color:rgb(194, 192, 192);
    cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.show{
    display: flex;
}
.hide{
    display:none;
}
.showAtdragging{
    border-radius: 10px;
    margin:10px;
    height: 82px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:rgba(47, 47, 47, 0.571);
    box-shadow: inset 0px 0px 0px 2px black;
}
.showAtdragging > div{
    position: relative;
    font-size: 30pt;
    color:black;
}

@media screen and (max-width:450px) {
    .main {
    width: 100%;
    display: grid;
    grid-template-columns: 10% repeat(2,1fr) 10%;
    grid-template-rows: 10vh 10vh auto;
    grid-column-gap: 0px;
    grid-row-gap: 10px;
    align-items: start;
    }
    .first{
        flex-basis:10%;
    }
    .user{
        display:none;
    }
    .last{
        flex-basis:10%;
    }
    .todo { 
    grid-area: 3 / 2 / auto / 4;
    background-color: rgb(216, 215, 215);
    border-radius: 10px;
    margin-right: 0px;
    display: flex;
    flex-direction: column;
    }
    .done { 
    grid-area: 4 / 2 / auto / 4;
    background-color: rgb(216, 215, 215);
    border-radius: 10px;
    margin-left: 0px;
    display: flex;
    flex-direction: column;
    }
    .dropdown{
    position:absolute;
    right:0;
    width: 90vw;
    height: 95vh;
    border-radius: 0;
    background-color:rgb(255, 255, 255);
    -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .Mobile {
        width: inherit;
        display: flex;
        flex-direction: column;
        padding: 0;
        font-weight: bold;
        color:grey;
    }
    .Mobile > div:first-child {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-basis: 10%;
        padding-top: 1vh;
    }
    .Mobile > div:first-child > div:first-of-type {
        background-color:rgba(0, 0, 0, 0.177);
        border-radius: 50%;
        width: 25px;
        height:25px;
        border: 1px solid rgb(142, 142, 142);
        padding:8px;
        display:flex;
        align-items: center;
    }
    .Mobile >div:nth-child(2){
        flex-basis: 90%;
        border-bottom: 1px solid grey;
    }
    .Mobile > div:last-child{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-basis: 10%;
    }
    .Mobile > div:last-child > img {
        height:20px;
        margin-right: 1vw;
    }
    @-webkit-keyframes slide-in-right {
    0% {
        -webkit-transform: translateX(1000px);
                transform: translateX(1000px);
        opacity: 0;
    }
    100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
        opacity: 1;
    }
    }
    @keyframes slide-in-right {
    0% {
        -webkit-transform: translateX(1000px);
                transform: translateX(1000px);
        opacity: 0;
    }
    100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
        opacity: 1;
    }
    }
}
</style>