const getters = {
  currentSong: state => state.song.currentSong,
  songList:state=>state.song.songList,
  fullScreen:state=>state.song.fullScreen,
  currentIndex:state=>state.song.currentIndex,

}
export default getters
