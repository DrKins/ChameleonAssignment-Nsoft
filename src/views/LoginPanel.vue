<template>
  <div class="loginPanel">
      <img src="../assets/logo.png" alt="logo">
      <form class="loginForm">
          <div class="input">
            <input ref="emailInput" v-model="userInput.email" class="inputfieldholder" type="email" @blur="Validation(userInput.email)" placeholder="" required pattern="\S+"/>
                <label class="inputLabel"><span>{{field1}}</span></label>
          </div>
          <div class="input">
            <input ref="passwordInput" v-model="userInput.password" class="inputfieldholder" type="password" required>
                <label class="inputLabel"><span>{{field2}}</span></label>
                <img v-if="controllerVisibility===false" class="inputVisibility" src="../assets/visible.png" alt="visible" @click="changeVisibility">
                <img v-if="controllerVisibility===true" class="inputVisibility" src="../assets/invisible.png" alt="visible" @click="changeVisibility">
          </div>
          <div class="options">
            <div class="checkbox">
                <input class="checkbox" type="checkbox">
                    <label class="checkboxLabel"><span>Remember me</span></label>
            </div>
            <div class="forget">Forgot your password?</div>
          </div>
          <button class="button" type="button" @click="login()">Login</button>
      </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
//import { EventBus } from '../main';
export default {
  name: 'LoginPanel',
  data:function(){
      return{
          //Prototype storing user input.
          userInput:{
              email:'',
              password: '',
          },
        // fields displayed on top of inputs that change depend on state of login.
        field1: 'Email',
        field2: 'Password',
        // Controller of showing and hiding password.
        controllerVisibility: false,
      }
  },
  computed: {
      // Getting all users from store to compare with login data.
      ...mapGetters({
          users: 'allusers'
      })
  },
  methods: {
      //Calling login that changes active user or inserts new one.
      ...mapActions({
          callLogin: 'userAction'
      }),
      //Method that shows and hides password input value.
      changeVisibility(){
          this.controllerVisibility = !this.controllerVisibility;
          if(this.controllerVisibility === true) this.$refs.passwordInput.type="text";
          else this.$refs.passwordInput.type="password";
      },
      // Login method that checks if user is inside base. if not it creates new one.
      login(){
          this.users.forEach(element => {
              if(element.username === this.userInput.email){
                  if(element.password === this.userInput.password){
                        this.callLogin({
                            new: false,
                            username: this.userInput.email,
                            password: this.userInput.password,
                        })
                        this.$router.push('/panel');
                  } else {
                      this.$refs.passwordInput.style.borderColor="red";
                      this.userInput.password='';
                      this.field2='Please enter correct password';
                    }
              } else  {
                    if((this.userInput.email ==='')||(this.userInput.email === null)) return;
                    this.callLogin({
                            new: true,
                            username: this.userInput.email,
                            password: this.userInput.password,
                        });
                        this.$router.push('/panel');
                }
          });
      },
      Validation(email){
        var re = /\S+@\S+\.\S+/;
        if(!re.test(email)){
            this.userInput.email=null;
            this.field1='Please enter valid Email';
            this.$refs.emailInput.style.borderColor="red";
        } else {
            this.field1='Email';
            this.$refs.emailInput.style.borderColor="rgb(52, 52, 125)"
        }
      },
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginPanel{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    height: inherit;
}
.loginForm{
    display:flex;
    flex-direction: column;
    width: 35%;
    margin-top:25px;
}
.input{
    background-color: transparent;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    border:none;
}
.inputfieldholder {
    background-color: transparent;
    border: 1px solid rgb(110, 110, 111);
    padding: 10px;
    border-radius: 5px;
    width: -webkit-fill-available;
}
.inputLabel {
    position: absolute;
    left: 11.5px;
    height: 30px;
    bottom: 0px;
    pointer-events: none;
    transition: ease-in-out 250ms;
}
.inputfieldholder:focus,
.inputfieldholder:valid{
    outline: none;
    border:none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 2px solid rgb(52, 52, 125);
}
.inputfieldholder:focus +.inputLabel,
.inputfieldholder:valid +.inputLabel{
    font-size: 11pt;
    transition: ease-in-out 800ms;
    height: 30px;
    bottom: 20px;
    color:rgb(52, 52, 125);
}
.inputVisibility{
    position: absolute;
    right: 15px;
    height: 20px;
    bottom: 10px; 
}
.options{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
}
.checkboxLabel{
    margin-left: 5px;
}
.button{
    margin-top:5vh;
    height: 50px;
    outline: none;
    -webkit-box-shadow: 0px 25px 20px -20px rgb(37, 22, 152);
    -moz-box-shadow: 0px 25px 20px -20px rgb(37, 22, 152);
    box-shadow: 0px 25px 20px -20px rgb(37, 22, 152); 
    border:none;
    color:whitesmoke;
    background-color:rgb(34, 34, 182);
}
@media screen and (max-width:450px) {
    .loginForm{
    display:flex;
    flex-direction: column;
    width: 85%;
    margin-top:25px;
    }
    .inputLabel {
        position: absolute;
        left: 11.5px;
        height: 27px;
        bottom: 0px;
        pointer-events: none;
        transition: ease-in-out 250ms;
    }
    .button{
        margin-top:5vh;
        height: 50px;
        outline: none;
        -webkit-box-shadow: 0px 25px 20px -20px rgb(37, 22, 152);
        -moz-box-shadow: 0px 25px 20px -20px rgb(37, 22, 152);
        box-shadow: 0px 25px 20px -20px rgb(37, 22, 152); 
        border:none;
        color:whitesmoke;
        background-color:rgb(34, 34, 182);
    }       
}
</style>