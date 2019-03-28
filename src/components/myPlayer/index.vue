<template>
    <div v-show="currentSong" class="playBox">
        <!--默认播放器-->
        <transition name="normal">
            <div class="normalPlayer" v-show="fullScreen">
                <div class="background">
                    <img :src="currentSong ? currentSong.pic : ''" alt="">
                </div>
                <div class="top">
                    <div class="back" @click="$store.commit('SET_FULLSCREEN',false)">
                        <i class="icon-back"></i>
                    </div>
                    <h2>{{currentSong ? currentSong.name : ''}}</h2>
                    <p>{{currentSong  ? currentSong.singer : ''}}</p>
                </div>
                <div class="middle">
                    <div class="pistionPic">
                        <div class="pic" :class="playing ? 'play' :'play pause' ">
                            <div>
                                <img :src="currentSong ? currentSong.pic : ''" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="progress_box">
                        <span class="time_s">{{ currentTime | format }}</span>
                        <my-progress :percent="percent" @percentChange="percentChange" @percentChangeEnd="percentChangeEnd"></my-progress>
                        <span class="time_e">{{ duration | format}}</span>
                    </div>
                    <div class="operate_box">
                        <div>
                            <i  class="icon-prev" @click="preSong"></i>
                        </div>
                        <div>
                            <i :class="playing ? 'icon-pause' : 'icon-play'" @click="togglePlaying"></i>
                        </div>
                        <div>
                            <i class="icon-next" @click="nextSong"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!--迷你播放器-->
        <transition name="mini">
            <div class="miniPlayer" v-show="!fullScreen" @click.stop="$store.commit('SET_FULLSCREEN',true)">
                <div>
                    <div  :class="playing ? 'play' :'play pause' " class="pic">
                        <img :src="currentSong ? currentSong.pic : ''" alt="">
                    </div>
                    <div class="text">
                        <p>{{currentSong ? currentSong.name : ''}}</p>
                        <span>{{currentSong  ? currentSong.singer : ''}}</span>
                    </div>
                </div>
                <div>
                    <i :class="playing ? 'icon-pause' : 'icon-play'" @click.stop="togglePlaying"></i>
                </div>
            </div>
        </transition>
        <audio :src="currentSong ? currentSong.url : ''" ref="myMusic" autoplay @play="canplay" @ended="end" @timeupdate="timeupdate" id="music-audio"></audio>
    </div>
</template>

<script>
    import myProgress from '../progress'
    import circleProgress from '../circleProgress'
    import {myTime} from '../../utils/fillters'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: "index",
        data(){
            return {
                // percent:0,
                move:false,
                songCanplay:false,
                playing:false,
                duration:0,
                currentTime:0,
                radius:32
            }
        },
        watch:{
            playing(newVal){
                let audio=this.$refs.myMusic;
                this.$nextTick(()=>{
                    newVal ? audio.play() : audio.pause()
                })
            }
        },
        filters:{
            format:function(val){
                if(!val) return '0:00'
                return myTime.format(val)
            }
        },
        components:{
            myProgress,
            circleProgress
        },
        mounted(){
            console.log(this.songList)
        },
        computed:{
            percent(){
                return this.currentTime / this.duration
            },
            ...mapGetters([
                'currentSong',
                'songList',
                'fullScreen',
                'currentIndex'
            ])
        },
        methods:{
            percentChange(newPercent){
                this.move=true;
                let currentTime = this.duration * newPercent;

            },
            percentChangeEnd(newPercent){
                this.move=false;
                let currentTime = this.duration * newPercent;
                this.$refs.myMusic.currentTime=currentTime
            },
            togglePlaying(){
                this.playing=!this.playing;
            },
            canplay(){
                this.playing=true;
                setTimeout(()=>{
                    this.duration=this.$refs.myMusic.duration;
                },100)

            },
            end(){
                // this.playing=false;
                this.$store.dispatch('setCurrentSong',this.currentIndex==this.songList.hotlist.length-1 ? 0 : this.currentIndex+1)
            },
            timeupdate(e){
                if(this.move){
                    return
                }
                this.currentTime=e.target.currentTime;
            },
            //上一曲
            preSong(){
                this.$store.dispatch('setCurrentSong',this.currentIndex == 0 ? 0 : this.currentIndex-1)
            },
            //下一曲
            nextSong(){
                this.$store.dispatch('setCurrentSong',this.currentIndex==this.songList.hotlist.length-1 ? 0 : this.currentIndex+1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/scss/const';
    .playBox{

        .normalPlayer{
            position:fixed;
            top:0;
            /*display: none;*/
            z-index:10000;
            left:0;
            background:#222;
            width:100%;
            height:100%;
            .background{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: 0.6;
                filter: blur(20px);
                img{
                    width:100%;
                    height:100%;
                }
            }
            .top{
                position:relative;
                color:$color-text;
                font-size:$font-size-large-x;
                margin-top:.3rem;
                .back{
                    position:absolute;
                    top:0;
                    left:.2rem;
                    transform: rotate(-90deg);
                    i{
                        font-size: $font-size-large-x;
                        color: $color-theme;
                    }
                }
                h2{
                    font-weight:500;
                    font-size:.36rem;
                }
                p{
                    font-size:.28rem;
                    line-height:.54rem;
                }
            }
            .middle{
                margin-top:.5rem;
                position:relative;
                height:8rem;
                .pistionPic{
                    position:absolute;
                    top:0;
                    left:50%;
                    transform: translateX(-50%);
                    width:6rem;
                    height:6rem;
                    border-radius:50%;
                    overflow: hidden;
                    border:10px solid rgba(255,255,255,.1);
                    .pic{
                        width:100%;
                        height:100%;
                        img{
                            width:100%;
                            height:100%;
                        }
                        &.play {
                            animation: rotate 20s linear infinite;
                        }
                        &.pause {
                            animation-play-state: paused;
                            -webkit-animation-play-state:paused;
                        }
                    }
                }
            }
            .bottom{
                .progress_box{
                    display: flex;
                    width:80%;
                    justify-content: space-between;
                    margin:1rem auto 0;
                    color:#fff;
                    span.time_s{
                        margin-right:.2rem;
                        position:relative;
                        top:-.08rem;
                    }
                    span.time_e{
                        margin-left:.2rem;
                        position:relative;
                        top:-.08rem;
                    }
                }
                .operate_box{
                    display: flex;
                    justify-content: space-around;
                    width:80%;
                    margin:.5rem auto 0;
                    i{
                        font-size:.68rem;
                        color:#ffcd32;
                    }
                }
            }
        }
        .miniPlayer{
            position:fixed;
            bottom:0;
            left:0;
            width:100%;
            z-index:10000;
            height:1.2rem;
            background:rgba(255,255,255,.8);
            display:flex;
            justify-content: space-between;
            &>div{
                display: flex;
                /*justify-content: space-around;*/

            }
            &>div:first-child{
                padding-left:.4rem;
                box-sizing: border-box;
                padding-top:.2rem;
                width:70%;
                line-height:.4rem;
                text-align:left;
                & .pic{
                    width:.8rem;
                    height:.8rem;
                    border-radius:50%;
                    overflow:hidden;
                    img{
                        width:100%;
                        /*height:100%;*/
                    }
                    &.play {
                        animation: rotate 20s linear infinite;
                    }
                    &.pause {
                        animation-play-state: paused;
                        -webkit-animation-play-state:paused;
                    }
                }
                .text{
                    margin-left:.32rem;
                }
            }
            &>div:last-child{
                width:30%;
                height:100%;
                text-align:center;
                align-items: center;
                i{
                    font-size:.68rem;
                    color:#ffcd32;
                    margin:0 auto;
                }
            }
        }
        @keyframes rotate {
            0%{
                transform: rotate(0);
            }
            100%{
                transform: rotate(360deg);
            }
        }
    }

</style>