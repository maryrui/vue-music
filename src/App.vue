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
    data () {
        return {
            stop: false
        }
    },
    mounted () {
        let m = document.querySelector('#app')
        console.log('mounted')
        m.addEventListener('touchend', this.firstPlay)
    },
    methods: {
        firstPlay () {
            let music = document.querySelector('#music-audio');
            music.play()
            if (music.src !== '') {
                this.stop = true
            }
        }
    },
    watch: {
        stop () {
            let m = document.querySelector('#app')
            m.removeEventListener('touchend', this.firstPlay)
        }
    },
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
