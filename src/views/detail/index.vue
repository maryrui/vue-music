<template>
    <div class="detail_box">
        <p class="back" @click="$router.go(-1)" ref="header"><i class="icon-back"></i>{{headerTitle}}</p>
        <Scroll  @scroll="scroll"
             :probe-type="probeType"
             :listen-scroll="listenScroll"
        >
           <div>
               <div class="top" ref="bgImage">
                   <p >
                       <img :src="detail ? detail.picUrl : ''" alt="">
                   </p>

               </div>

               <div class="list">
                   <div>全部播放（{{hotList.length}}）</div>
                   <ul>
                       <li v-for="(item,index) in hotList" @click="selectSong(index)">
                           <p>{{(index+1)}}</p>
                           <div>
                               <h2>{{item.name}}</h2>
                               <span>{{detail.name}}</span>
                           </div>
                       </li>
                   </ul>
               </div>
           </div>
        </Scroll>
    </div>
</template>

<script>
    import {getSingerDetail} from '@/api/singer'
    import Scroll from '@/components/scroll'
    export default {
        name: "index",
        data(){
            return {
                detail:null,
                hotList:[],
                probeType:3,
                scrollY:0,
                listenScroll:true,
                headerTitle:'歌手'
            }
        },
        mounted(){
            this.imageHeight = 250
        },
        created(){
            let id=this.$route.params.id;
            this.getSingerDetail({id:id})
        },
        methods:{
            getSingerDetail(query){
                getSingerDetail(query).then(res=>{
                    if(res.code==200){
                        this.hotList=res.hotSongs;
                        this.detail=res.artist;
                        let list={
                            hotlist:res.hotSongs,
                            singer:res.artist.name,
                            pic:res.artist.img1v1Url
                        }
                        console.log(list);
                        this.$store.commit('SET_SONGLIST',list)

                    }
                })
            },
            scroll(val){
                this.scrollY=val.y;
            },
            selectSong(index){
                this.$store.dispatch('setCurrentSong',index).then(res=>{

                })
            }
        },
        watch:{
            scrollY(newY){
                const percent = Math.abs(newY / this.imageHeight)
                if(newY+this.imageHeight<0){
                    this.headerTitle=this.detail.name;
                }else{
                    this.headerTitle='歌手';
                }
                if (newY < 0) {
                    this.$refs.header.style.background = `rgba(212, 68, 57, ${percent})`
                } else {
                    this.$refs.header.style.background = `rgba(212, 68, 57, 0)`;

                }
            }
        },
        components:{
            Scroll
        }
    }
</script>

<style scoped lang="scss">
    .detail_box{
        position:fixed;
        top:0;
        left:0;
        z-index:1000;
        width:100%;
        height:100%;
        .back{
            width:100%;
            position:fixed;
            top:0;
            left:0;
            height:.8rem;
            color:#fff;
            text-align:left;
            font-size:.32rem;
            line-height:.8rem;
            padding-left:.2rem;
            z-index:1000;
            i{
                margin-right:.2rem;
            }
        }
        .top{
            position:relative;
            height:5rem;
            z-index:50;
            &>p:first-child {
                img {
                    width: 100%;
                }
            }

        }
        .list{
            text-align:left;
            position:relative;
            z-index:100;
            border-top-left-radius:15px;
            border-top-right-radius:15px;
            background:#f2f3f4;
            /*height:4rem;*/
            &>div{
                line-height:.8rem;
                font-size:.32rem;
                height:.8rem;
                border-bottom:1px solid #ccc;
                padding-left:.32rem;
            }
            ul{
                li{
                    display: flex;
                    justify-content: flex-start;
                    align-items:center;
                    padding-left:.32rem;
                    height:1rem;
                    border-bottom:1px solid #ccc;
                    p{
                        font-size:.28rem;
                        margin-right:.32rem;
                    }
                    h2{
                        margin-bottom:.2rem;
                        font-weight:500;
                        font-size:.3rem;
                    }
                }
            }
        }
    }
</style>