<template>
  <div class="card" draggable @dragstart='startDrag($event, idVal)' @dragend="dragEnd">
    <div v-if="imageURL" class="imageSlot"><img :src="imageURL" alt="uploadedimg"></div>
    <div class="cardSlot">
    <div v-if="done === false" class="checkbox"><img src="../assets/checkbox.png" alt="checkbot" @click="checkbox"></div>
    <div v-if="done === true" class="checkbox"><img src="../assets/checkbox active.png" alt="checkbot" @click="checkbox"></div>
    <input id="LabelInput" @blur="updating()" v-model="textVal" type="text" class="textArea" v-bind:class="{ notclickable: doneVal}" @click="setFocus">
    <div class="menuArea">
        <img class="dots" src="../assets/dots.png" alt="dots" v-bind:class="{show:optionsController}" @click="optionsController = !optionsController">
        <div class="dropdown" v-bind:class="{show:optionsController, hide:!optionsController}">
            <div v-if="!doneVal">
                <label for="file"><div class="image"><img src="../assets/picture.png" alt="image">Image</div></label>
                <input type="file" :id="idVal" @change="onFileChange" accept="image/*" class="inputfile" @click="uploadPhotoMobile">
            </div>
            <div v-if="!doneVal" class="middle-line"></div>
            <div @click="deleteOne">
                <div class="delete"><img src="../assets/delete.png" alt="deleteOne"></div>
                <div>Delete</div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import{ mapActions, mapGetters } from "vuex";
import { EventBus } from "../main";
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
        },
        imgURL:{
            type:String,
            require:true,
        }
    },
    name: 'card',
    components:{
    },
    data:function(){
        return{
            //Value of id prop
            idVal: this.id,
            // Value of text prop
            textVal: this.text,
            //Value of done prop
            doneVal: this.done,
            //Value of img prop
            imageURL: this.imgURL,
            //Value of insertion prop ( new card is being added )
            addController: this.insertion,
            //Controller of dropdown options menu
            optionsController: false,
        }
    },
    computed:{
        //Getter of all cards, needed just for lenght of array.
        ...mapGetters({
            items: 'updateData'
        })
    },
    methods: {
        ...mapActions({
            callChangeMutation: 'changeAction',
            callInsertMutation: 'insertAction',
            callCheckboxMutation: 'checkboxAction',
            callDeleteOneMutation: 'deleteOneAction',
            callDeleteDoneMutation: 'deleteDoneAction',
        }),
        //Method that updates and adds new card.
        updating(){
            if(this.addController) {this.callInsertMutation({
                id: this.items.length,
                label: this.textVal,
                done: this.doneVal,
                imageURL: null,
            })
            this.$emit('inserted',false);
            }
            else {
                this.callChangeMutation({
                id: this.idVal,
                label: this.textVal,
                imageURL: this.imageURL,
                })
            }
        },
        //Method that mutates "done" value
        checkbox(){
            this.callCheckboxMutation({
                id: this.idVal,
                label: this.textVal,
                done: this.doneVal,
                imageURL: this.imageURL,
            });
        },
        //Method that is called when user wants to delete one card.
        deleteOne(){
            this.callDeleteOneMutation({
                id: this.idVal,
                label: this.textVal,
                done: this.doneVal,
            }),
            this.optionsController = false;
        },
        //Method that makes LabelInput element focused when clicked.
        setFocus(){
            document.getElementById("LabelInput").focus();
        },
        //Method made for uploading photos on phone.
        uploadPhotoMobile(){
            document.getElementById(this.idVal).click()
        },
        //Method being called when we upload img. Method gets imageURL and calls updating() for card update.
        onFileChange(e){
            const file = e.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                this.imageURL = e.target.result
                this.updating();
                this.optionsController = false;
            }
        },
        //Method called when card is being dragged by user. transfers Card ID.
        startDrag(evt, item){
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('itemID', item)
        this.$emit('dragging',true,this.doneVal);
        this.$emit('idofDrag',item);
        },
        //Method called when drag is finished so graphics can update on lists.vue
        dragEnd(){
            this.$emit('dragging',false,this.doneVal);
    },
    },
    created(){
        //Listening for deleteDone emit from parent. Deleting all done cards.
        EventBus.$on('deleteDone',value =>{
            if((value == true)&&(this.doneVal===true)) {
                this.callDeleteDoneMutation({
                    label: this.textVal,
                    done: this.doneVal,
                })
            }
        });
    }
}
</script>

<style scoped>
.card{
    display: flex;
    flex-direction: column;
    align-content: center;
    margin:1.5vh;
    border-radius: 10px;
    background-color: whitesmoke;
}
.imageSlot{
    display: flex;
    justify-content: center;
    align-items: center;
}
.imageSlot > img{
    height: 200px;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.cardSlot{
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
    font-size: 12pt;
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
    top:2.5vh;
    right: .2vw;
    background-color: rgb(247, 247, 247);
    border-radius:10px;
    border: 1px solid rgba(0, 0, 0, 0.143);
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
    align-items: center;
    justify-content:flex-start;
    align-self:flex-start;
}
.dropdown > div > div > img{
    height: 20px;
    margin-right: .5vw;
    padding-left: .5vw;
}
.image{
    margin:1vh;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content:flex-start;
    align-self:flex-start; 
    cursor: pointer;
}
.image > img{
    height: 20px;
    margin-right: .5vw;
}
.inputfile{
    opacity: 0;
    position: absolute;
    z-index: 1;
    right:0vh;
    width: inherit;
    height:50px;
    margin-bottom: 5px;
    cursor: pointer;
}
.middle-line{
    background-color: rgba(0, 0, 0, 0.143);
    height: 1px;
    position: relative;
    width: inherit;
    top:-.55vh;
    left:-.6vw;
}
.hide{
    display: none;
}
.show{
    display:unset;
    opacity: 1;    
}
.notclickable{
    pointer-events: none;
}
</style>