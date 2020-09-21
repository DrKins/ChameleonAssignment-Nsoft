<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap');
*{
  margin: 0;
}
body{
  overflow:hidden;
}
#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(270deg, #ffffff, #e7e7e7);
  background-size: 400% 400%;
  -webkit-animation: gradientAnim 26s ease infinite;
  -moz-animation: gradientAnim 26s ease infinite;
  -o-animation: gradientAnim 26s ease infinite;
  animation: gradientAnim 26s ease infinite;
}

@-webkit-keyframes gradientAnim {
    0%{background-position:0% 51%}
    50%{background-position:100% 50%}
    100%{background-position:0% 51%}
}
@-moz-keyframes gradientAnim {
    0%{background-position:0% 51%}
    50%{background-position:100% 50%}
    100%{background-position:0% 51%}
}
@-o-keyframes gradientAnim {
    0%{background-position:0% 51%}
    50%{background-position:100% 50%}
    100%{background-position:0% 51%}
}
@keyframes gradientAnim {
    0%{background-position:0% 51%}
    50%{background-position:100% 50%}
    100%{background-position:0% 51%}
}
</style>
