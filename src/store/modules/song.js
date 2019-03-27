import { getSong } from '@/api/song'


const song = {
  state: {
    currentSong:null,
    songList:[],
    fullScreen:true,
    currentIndex:0
  },

  mutations: {
        SET_CURRENTSONG:(state,currentSong)=>{
          state.currentSong=currentSong
        },
        SET_SONGLIST:(state,songList)=>{
          state.songList=songList;
        },
        SET_FULLSCREEN:(state,fullScreen)=>{
          state.fullScreen=fullScreen;
        },
        SET_CURRENINDEX:(state,currentIndex)=>{
          state.currentIndex=currentIndex;
        },
  },

  actions: {
    setCurrentSong({commit,state},index){
        return new Promise((resolve,reject)=>{
            getSong({id:state.songList.hotlist[index].id}).then(res=>{
                let oneSong=res.data[0];
                oneSong.name=state.songList.hotlist[index].name;
                oneSong.singer=state.songList.singer;
                oneSong.pic=state.songList.pic;
                commit('SET_CURRENTSONG',oneSong);
                commit('SET_CURRENINDEX',index);
                commit('SET_FULLSCREEN',true);
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    setSongList({commit},list){
        return new Promise((resolve,reject)=>{
            commit('SET_SONGLIST',list)
        })
    }
  }
}

export default song
