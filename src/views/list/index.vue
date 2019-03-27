<template>
    <Scroll class="list_box" ref="list" @scroll="scroll"  :probeType="probeType" :listenScroll="listenScroll">
        <ul>
            <li v-for="(items,index) in singerList " ref="group">
                <p>{{items.title}}</p>
                <ul class="singerList">
                    <li v-for="(item,index) in items.item" @click="singerClick(item.id)" :key="index">
                        <img v-lazy="item.avatar" alt="">
                        <div>
                            <span>{{item.name}}</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="listSort">
            <li v-for="(item,index) in sortTitle" :key="index" :class="{current:currentIndex==index}" @click="selectTitle(index)">{{item}}</li>
        </ul>
    </Scroll>
</template>

<script>
    import {getList} from '@/api/singer'
    import Scroll from '@/components/scroll'
    import Singer from '../../utils/singer'
    import pinyin from 'pinyin'
    // const pinyin = require('pinyin')
    const HOT_NAME='热门';
    const HOT_SINGER=10;
    export default {
        name: "index",
        data(){
            return {
                singerList:[],
                currentIndex:0,
                scrollY:-1,
                listHeight:[],
                listenScroll:true,
                probeType:3
            }
        },
        props:{
            data:{
                type:Array
            }
        },
        created(){
            this.getSingeList();
        },
        computed:{
            sortTitle(){
                return this.singerList.map((title)=>{
                    return title.title.substr(0,1)
                })
            }
        },
        components:{
            Scroll
        },
        methods:{
            getSingeList(){
                getList().then(res=>{
                    let s=res.artists;
                    s.map((item)=>{
                        let py=pinyin(item.name[0], {style:pinyin.STYLE_FIRST_LETTER})
                        item.init=py[0][0].toUpperCase();
                        // console.log(item);
                    })
                    this.singerList=this._normalizeSinger(s)

                })
            },
            //数据处理
            _normalizeSinger(list){
                let map={
                    hot:{
                        title:HOT_NAME,
                        item:[],
                    },
                }
                list.forEach((item,index)=>{
                    if(index<HOT_SINGER){
                        map['hot'].item.push(new Singer({
                            id:item.id,
                            name:item.name,
                            avatar:item.img1v1Url,
                            aliaName:item.alias.join('/')
                        }))
                    }
                    const key=item.init;
                    if(!map[key]){
                        map[key]={
                            title:key,
                            item:[]
                        }
                    }
                    map[key].item.push(new Singer({
                        id:item.id,
                        name:item.name,
                        avatar:item.img1v1Url,
                        aliaName:item.alias[0]
                    }))
                })

                let hot=[];
                let ret=[];
                for( const key in map ){
                    let val=map[key];
                    if(val.title.match(/[A-Z]/)){
                        ret.push(val);
                    }else if(val.title==HOT_NAME){
                        hot.push(val)
                    }
                }

                ret.sort((a,b)=>{
                    return a.title.charCodeAt(0)-b.title.charCodeAt(0)
                })

                return hot.concat(ret);
            },
            //列表点击
            singerClick(id){
                this.$router.push('/detail/'+id);
            },
            //点击右侧导航
            selectTitle(index){
                this.currentIndex=index;
                this._scrollTo(index);
            },
            _scrollTo(index){
                this.$refs.list.scrollToElement(this.$refs.group[index],0)
            },
            scroll(pos){
                this.scrollY=pos.y;
            },
            _calculateHeight(){
                this.listHeight=[];
                let list=this.$refs.group;
                let height=0;
                this.listHeight.push(height);
                for(let i=0;i<list.length;i++){
                    height+=list[i].clientHeight;
                    this.listHeight.push(height);
                }
            }
        },
        watch:{
            singerList(){
                setTimeout(()=>{
                    this._calculateHeight()
                })
            },
            scrollY(newY){
                const listHeight = this.listHeight;
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                for(let i=0;i<listHeight.length-1;i++){
                    let height1=listHeight[i];
                    let height2=listHeight[i+1];
                    if(-newY>=height1&&-newY<height2){
                        this.currentIndex=i;
                        return
                    }
                }
                this.currentIndex=listHeight.length-2
            }
        }
    }
</script>

<style scoped lang="scss">
    .list_box{
        .singerList{
            li{
                overflow:hidden;
                padding:.25rem;
                border-bottom:1px solid #ccc;
                img{
                    float:left;
                    width:.8rem;
                    height:.8rem;
                    border-radius:2px;
                }
                div{
                    float:left;
                    text-align:left;
                    margin-left:.23rem;
                    line-height:.8rem;
                }
            }
        }
       .ranking{

       }
        p{
            text-align: left;
            height:.45rem;
            line-height:.45rem;
            padding-left:.2rem;
            background:rgba(0,0,0,.1);
            color:#fff;
        }
        .listSort{
            position:fixed;
            right:.1rem;
            top:.3rem;
            padding:.1rem .2rem;
            line-height:.45rem;
            .current{
                color:#ff5044;
            }
        }
    }


</style>