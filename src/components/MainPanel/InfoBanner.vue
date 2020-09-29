<template>
    <div class="infoBanner">
        <div class="info">
            <h4>Manage your to do list</h4>
            <p>click on checkbox or drag and drop to done</p>
        </div>        
    </div>  
</template>

<script>
export default {
  name: 'InfoBanner',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.infoBanner{
    grid-area: 1 / 1 / 2 / 5;
    height:100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 10vw repeat(2,1fr) 10vw;
    grid-template-rows: 10vh 10vh auto;
    grid-column-gap: 0px;
    grid-row-gap: 5px;
    align-items: center;
}
.info{
    grid-area: 2 / 2 / 2 / 5;
    text-align: left;
    align-self: center;
    font-size: 12pt;
}
.info > p {
    color: grey;
}
@media screen and (max-height:450px){
    .infoBanner {
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
}
</style>