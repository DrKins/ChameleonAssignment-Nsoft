# Chameleon Assignment
Chameleon Assignment is my NSoft Task application. It is simple,intuitive todo application made for everyone. Application has responsive design and drag and drop functionality.
Feel free to test it out!

Demo link: https://sparkteam3.000webhostapp.com/

Demo username: example@gmail.com 
Demo password: 1234

## Getting Started
After cloning repository you will need to install all node modules.
```
npm install
```
npm installation is finished? You are ready to run your app on localhost.

```
npm run serve
```

## How it works?
The application has two main panels: Login and Main. Main Panel is the panel where all application happens, while Login is a simple simulation of the login system. The user's main goal is to create new to-do cards via the big add button on the top right corner of the to-do list. After clicking the button, a new blank card will pop up at to of the list and you have to insert text into it. The application will block the creation of other cards if you don't input text in the label. Users can click on boxes of cards to move them back and forward, but also drag and drop functionality has been implemented so you can move cards via dragging and dropping. After you drag, an area, where you should drop, will pop up and you will need to drop the card there otherwise it will fail to move. Login panel has three goals, one is to let correct username and password into MainPanel, second is to forbid unauthorised access if user fails username or password, and lastly third is to create new users if user enters username or password that is not found in base at the moment.  

### Login panel
We have simplistic one box centered login layout.
- ##### `/` - LoginPanel.vue
 ![Login Panel](https://i.ibb.co/xGVh75r/chrome-capture.png)
 
### Main panel
MainPanel is build out of few components, started from header to lists.
- ##### `/panel` - MainPanel.vue
 ![Main Panel](https://i.ibb.co/SsmDLnQ/chrome-capture-1.png)
