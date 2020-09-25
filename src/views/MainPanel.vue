<template>
  <div class="main">
    <div class="header">
        <div class="first"></div>
        <div class="logo"><img src="../assets/logo.png" alt="logo"></div>
        <div class="user-menu" v-bind:class="{ clickedAvatar: controllerAvatar }" @click="controllerAvatar = !controllerAvatar">
            <div class="user">{{user}}</div>
            <div class="avatar"><img src="../assets/avatar.png" alt="avatar"></div>
            </div>
        <div class="last"></div>
    </div>
    <div class="info">
        <h4>Manage your to do list</h4>
        <p>click on checkbox or drag and drop to done</p>
    </div>
    <div class="dropdown" v-bind:class="{ show: controllerAvatar, hide: !controllerAvatar }" @click="logout">
            <img src="../assets/logout.png" alt="">
            <div>Log out</div>
    </div>
    <div class="todo" @drop='onDrop($event,false)' @dragover.prevent @dragenter.prevent> 
        <div class="todo-header noselect" >
            To-do list
            <div class="todo-adder noselect" @click="controllerNewCard = true">+</div>
        </div>
        <card v-if="controllerNewCard" :text="empty" :insertion="controllerNewCard" @inserted="ListenChildResponse"/>
        <card v-for="item in sort(items,false)" :key="item.id" :id="item.id" :text="item.label" :done="item.done" :imgURL="item.imageURL" />
    </div>
    <div class="done" @drop='onDrop($event,true)' @dragover.prevent @dragenter.prevent>
        <div class="done-header noselect">
            Done list
            <div class="done-remover noselect"><img src="../assets/delete all.png" alt="delete all" @click="EmitdeleteALLDone('deleteDone',true)"></div>
        </div>
        <card v-for="item in sort(items,true)" :key="item.id" :id="item.id" :text="item.label" :done="item.done" :imgURL="item.imageURL"/>
    </div>
  </div>
</template>

<script>
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
        controllerDragging: false,
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
        const item = this.items[itemID]
        console.log(item)
        this.callcheckboxMutation({
            id:item.id,
            done:state,
        })
    },
    logout(){
        this.$router.push('/login');
    }
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
    padding-right:3vw;
    padding-left:1vw;
    -webkit-box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    -moz-box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    border-radius: 5px;
    cursor: pointer;
    opacity: 0;
}
.dropdown > div{
    padding: 1.5vh;
}
.dropdown > img{
    align-self: center;
    height: 20px;
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
    opacity:1;
}
.hide{
    opacity:0,
}
.drag{
    box-shadow: inset 0px 0px 0px 2px grey;
    background-color:rgba(196, 196, 196, 0.224)
}
</style>