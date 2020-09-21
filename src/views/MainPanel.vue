<template>
  <div class="main">
    <div class="header">
        <div class="first"></div>
        <div class="logo"><img src="../assets/logo.png" alt="logo"></div>
        <div class="username">{{user}}</div>
        <div class="avatar"><img src="../assets/avatar.png" alt="avatar"></div>
        <div class="last"></div>
    </div>
    <div class="info">
        <h4>Manage your to do list</h4>
        <p>click on checkbox or drag and drop to done</p>
    </div>
    <div class="todo">
        <div class="todo-header noselect" >
            To-do list
            <div class="todo-adder noselect" @click="addNew = true">+</div>
        </div>
        <card class="troll" v-if="addNew" :text="empty" :insertion="addNew" @inserted="troll"/>
        <card v-for="item in sort(items,false)" :key="item.label" :text="item.label" :done="item.done" :id="item.id"/>
    </div>
    <div class="done">
        <div class="done-header noselect" >
            Done list
            <div class="done-remover noselect"><img src="../assets/delete all.png" alt="delete all"></div>
        </div>
        <card v-for="item in sort(items,true)" :key="item.label" :text="item.label" :done="item.done" :id="item.id"/>
    </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import card from '../components/card';
export default {
  name: 'MainPanel',
  components:{
      card,
  },
  data:function(){
      return{
        user: 'troll',
        empty: '',
        addNew: false,
      }
    },
  computed: {
      ...mapGetters({
          items: 'updateData'
      })
  },
  methods:{
      hide(){
          this.addNew = false;
      },
      troll(value){
          this.addNew = value;      
      },
      sort(arr,arg){
          let newArr=[]
          arr.forEach(element => {
              if(element.done === arg) newArr.push(element);
          });
          return newArr;
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
    grid-area: 1 / 1 / 1 / 6;
    align-self: stretch;
    background-color: rgb(216, 215, 215);
    display: flex;
    flex-direction: row;
}
.first{
    flex-basis:20%;
}
.logo{
    align-self: center;
}
.logo > img{
    height: 35px;
}
.username{
    color: rgb(90, 90, 90);
    font-weight: bold;
    text-align: right;
    padding: 10px;
    align-self: center;
    flex-grow: 1;
}
.avatar{
    background-color:rgb(194, 192, 192);
    border-radius: 50%;
    width: 25px;
    border: 1px solid rgb(142, 142, 142);
    padding:8px;
    align-self: center;

}
.avatar > img {
    height: 20px;
}
.last{
    flex-basis:20%;
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 26px;
    border-radius: 50%;
    background-color:rgb(194, 192, 192);
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
</style>