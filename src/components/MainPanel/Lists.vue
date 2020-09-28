<template>
  <div class="lists">
    <div class="todo">
        <div v-if="controllerDragging.todo" class="showAtdragging" @drop='onDrop($event,false)' @dragover.prevent @dragenter.prevent>
            <img src="../../assets/drop.png" alt="Drophere">
            <div>Drop Here</div>    
        </div> 
        <div v-if="!controllerDragging.todo" class="todo-header noselect" >
            To-do list
            <div class="todo-adder noselect" @click="controllerNewCard = true">+</div>
        </div>
        <!-- First card is card that is showed when you click on add New. Second one is v-for where all cards where being listed and sorted properly -->
        <card v-if="controllerNewCard" :text="empty" :insertion="controllerNewCard" @inserted="ListenChildResponse"/>
        <card v-for="item in sort(items,false)" :key="item.id" :id="item.id" :text="item.label" :done="item.done" :imgURL="item.imageURL" @dragging="dragDisplay"/>
    </div>
    <div class="done">
        <div v-if="controllerDragging.done" class="showAtdragging" @drop='onDrop($event,true)' @dragover.prevent @dragenter.prevent>
            <img src="../../assets/drop.png" alt="Drophere">
            <div>Drop Here</div>    
        </div> 
        <div v-if="!controllerDragging.done" class="done-header noselect">
            Done list
            <div class="done-remover noselect"><img src="../../assets/delete all.png" alt="delete all" @click="EmitdeleteALLDone('deleteDone',true)"></div>
        </div>
        <card v-for="item in sort(items,true)" :key="item.id" :id="item.id" :text="item.label" :done="item.done" :imgURL="item.imageURL" @dragging="dragDisplay"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { EventBus } from '../../main';
import card from '../card';
export default {
  name: 'Lists',
  components:{
      card,
  },
  data:function(){
      return{
        empty: '',
        controllerNewCard: false,
        controllerDragging: {
            todo: false,
            done: false,
        },
        mobile:false,
      }
    },
  computed: {
      //Getting cards from store.
      ...mapGetters({
          items: 'updateData',
      }),
  },
  methods:{
      //Calling Action that will mutate card on drag and drop.
      ...mapActions({
          callcheckboxMutation:'checkboxAction'
      }),
      // Method for showing / hiding Add card.
      hide(){
          this.controllerNewCard = false;
      },
      // Listening from card component when to hide Add card on top.
      ListenChildResponse(value){
          this.controllerNewCard = value;      
      },
      // EventBus emitter that sends signal to card component when client want to delete all done cards.
      EmitdeleteALLDone(name,params){
          EventBus.$emit(name, params);
          params = false;
      },
      // Sort method that is sorting lists differently based on argument provided.
      sort(arr,arg){
          let newArr=[]
          arr.forEach(element => {
              if(element.done === arg) newArr.push(element);
          });
          return newArr.reverse();
      },
      //Drag and drop methods.
      //OnDrop method that calls mutation of checkbox and hides drop area.
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
    //DragDisplay method chooses which drop area should it mark.
    dragDisplay(val1,val2){
        if(val1 == false) {
            this.controllerDragging.todo = false
            this.controllerDragging.done = false
        }
        else if(val2 == true){
            this.controllerDragging.todo = val1;
        }else this.controllerDragging.done = val1;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lists {
    grid-area: 1/1/3/auto;
    height:100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 20vw repeat(2,1fr) 20vw;
    grid-template-rows: 10vh 10vh auto;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-items: start;
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
    .lists {
    grid-area: 1/1/3/auto;
    height:100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 10vw repeat(2,1fr) 10vw;
    grid-template-rows: 10vh 10vh auto;
    grid-column-gap: 0px;
    grid-row-gap: 10px;
    align-items: start;
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
    margin-bottom: 10px;
    }
}
@media screen and (max-height:450px){
    .lists {
        height:100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: 20vw repeat(2,1fr) 20vw;
        grid-template-rows: 20vh 10vh auto;
        grid-column-gap: 0px;
        grid-row-gap: 20px;
        align-items: start;
    }
    .todo-header, .done-header {
        font-size: 12pt;
    }
    .todo, .done{
        margin-bottom: 10px;
    }
}
</style>