<template>
    <div class="headerMain">
        <div class="header">
            <div class="first"></div>
            <div class="logo"><img src="../../assets/logo.png" alt="logo"></div>
            <div class="user-menu" v-bind:class="{ clickedAvatar: controllerAvatar }" @click="emitter">
                <div class="user">{{user}}</div>
                <div class="avatar"><img src="../../assets/avatar.png" alt="avatar"></div>
            </div>
            <div class="last"></div>
        </div>
        <div class="dropdown" v-bind:class="{ show: controllerAvatar, hide: !controllerAvatar }">
            <div v-if="!mobile" class="notMobile" @click="logout">
                <img src="../../assets/logout.png" alt="">
                <div>Log out</div>
            </div>
            <div v-if="mobile" class="Mobile">
                <div>
                    <div><img src="../../assets/avatar.png" alt="avatar"></div>
                    <div>{{user}}</div>
                </div>
                <div></div>
                <div @click="logout">
                    <img src="../../assets/logout.png" alt="logout">
                    <div>Log out</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        //Prop about current device type.
        mobile: {
            type: Boolean,
            require: true,
        },
        //Prop that closes mobile dropdown when you click outside of dropdown.
        closePopUp:{
            type:Boolean,
            require: true,
        }
    },
  name: 'headerSection',
  components:{
  },
  data:function(){
      return{
        //Controller that controlls showing and hiding dropdown menu.
        controllerAvatar: false,
      }
    },
  computed: {
    // Getting active user from store.
    ...mapGetters({
        user: 'activeUser'
    }),
  },
  watch:{
    // We are listening to prop change.
    closePopUp: function(){
          this.controllerAvatar = this.closePopUp
    }
  },
  methods:{
    //Method that pushes router to loginPanel.
    logout(){
        this.$router.push('/');
    },
    // Emiting to MainPanel when to activate shadow class to blackout screen behinde mobile dropdown menu.
    emitter(){
        this.controllerAvatar = !this.controllerAvatar;
        if(this.controllerAvatar) this.$emit('activateShadow',this.controllerAvatar)
    }      
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headerMain{
    grid-area: 1/1/3/auto;
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
.clickedAvatar {
    background-color:rgb(202, 202, 202);
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
}@media screen and (max-width:450px) {
    .first{
        flex-basis:10%;
    }
    .user{
        display:none;
    }
    .last{
        flex-basis:10%;
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
@media screen and (max-height:450px){
    .headerMain {
        min-height:100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: 20vw repeat(2,1fr) 20vw;
        grid-template-rows: 20vh 10vh auto;
        grid-column-gap: 0px;
        grid-row-gap: 20px;
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