<template>
  <div class="card">
    <div v-if="done === false" class="checkbox"><img src="../assets/checkbox.png" alt="checkbot" @click="checkbox"></div>
    <div v-if="done === true" class="checkbox"><img src="../assets/checkbox active.png" alt="checkbot" @click="checkbox"></div>
    <input @blur="interact()" v-model="textVal" type="text" class="textArea">
    <div class="menuArea">
        <img class="dots" src="../assets/dots.png" alt="dots">
        <div class="dropdown">
            <div>
                <div class="image"><img src="../assets/picture.png" alt=""></div>
                <div>Image</div>
            </div>
            <span class="middle-line"></span>
            <div>
                <div class="delete"><img src="../assets/delete.png" alt=""></div>
                <div>Delete</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import{ mapActions} from "vuex";
export default {
    props:{
        text: {
            type: String,
            require:true,
        },
        done: {
            type: Boolean,
            require:true,
        },
        id: {
            type: Number,
            require:true,
        },
        insertion:{
            type:Boolean,
            require:true,
        }
    },
    name: 'card',
    components:{
    },
    data:function(){
      return{
          textVal: this.text,
          idVal: this.id,
          addController: this.insertion,
      }
    },
    methods: {
        ...mapActions({
            callChangeMutation: 'changeAction',
            callInsertMutation: 'insertAction',
            callCheckboxMutation: 'checkboxAction'
        }),
        interact(){
            if(this.addController == false) {
                this.callChangeMutation({
                    label: this.textVal,
                    id: this.idVal})
            } else {
                this.callInsertMutation({
                    label: this.textVal,
                    id: 0,
                    done: false,
                })
                this.$emit('inserted',false)
            }
        },
        checkbox(){
            this.callCheckboxMutation({
                id: this.idVal,
            });
        }
    }
}
</script>

<style scoped>
.card{
    display: flex;
    flex-direction: row;
    align-content: center;
    padding: 1vh;
    margin:1vh;
    border-radius: 10px;
    background-color: whitesmoke;
}
.checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
}
.textArea{
    width: 90%;
    margin-left: 1vh;
    outline: none;
    border:none;
    background-color: transparent;
}
.menuArea{
    position: relative;
    display:flex;
    align-content: center;
    justify-content: center;
}
.dots{
    cursor: pointer;
    opacity: 0;
    height: 18px;
}
.card:hover .dots{
    opacity: 1;
    transition: ease-in-out 250ms;
}
.dropdown{
    cursor: pointer;
    position:absolute;
    width: 20vh;
    top:2vh;
    right: .2vw;
    background-color: rgb(247, 247, 247);
    border-radius:10px;
    border: 1px solid rgba(0, 0, 0, 0.299);
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
    align-content: center;
    -webkit-box-shadow: -5px 10px 33px -20px rgba(0,0,0,0.75);
    -moz-box-shadow: -5px 10px 33px -20px rgba(0,0,0,0.75);
    box-shadow: -5px 10px 33px -20px rgba(0,0,0,0.75);  
}
.dropdown > div{
    margin:1vh;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content:flex-start;
    align-self:flex-start;
}
.dropdown > div > div > img{
    height: 20px;
    margin-right: .5vw;
}
.middle-line{
    background-color: grey;
    height: 1px;
}
</style>