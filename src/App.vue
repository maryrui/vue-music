<template>
  <div id="app">
    <router-view/>
    <my-player></my-player>
  </div>
</template>

<script>
  import myPlayer from './components/myPlayer'
export default {
    name: 'App',
    components:{
        myPlayer
    }


}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
