<template>
    <div class="progress-wrapper" ref="progressBar" @click="progressClick">
        <div class="bar">
            <div class="inner" ref="inner">
                <p class="circle" @touchstart.prevent="progressTouchstart" @touchmove.prevent="progressTouchmove" @touchend.prevent="progressTouchend">
                    <i></i>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                touch:{},
                circle:16
            }
        },
        props:{
            percent:{
                type:Number,
                default:0
            }
        },
        watch:{
            percent(newVal){
                // console.log(newVal)
                let barWidth=this.$refs.progressBar.clientWidth-this.circle
                let offsetWidth = newVal * barWidth
                this._move(offsetWidth)
            }
        },
        methods:{
            //滚动点击
            progressClick(e){
                let rectLeft=this.$refs.progressBar.getBoundingClientRect().left;
                let offsetLeft= e.pageX-rectLeft;
                this._move(offsetLeft);
                this._percentChange()
            },
            progressTouchstart(e){
                this.touch.init=true;
                //开始的拖动的
                this.touch.starX=e.touches[0].pageX;
                //已播放的长度
                this.touch.left= this.$refs.inner.clientWidth;

            },
            progressTouchmove(e){
                if(!this.touch.init) return
                this._percentChange()
                let delX=e.touches[0].pageX-this.touch.starX;

                let offsetLeft=Math.min(this.$refs.progressBar.clientWidth-this.circle,Math.max(0,this.touch.left+delX))

                this._move(offsetLeft)

            },
            progressTouchend(){
                this.touch.init=false;
                let barWidth=this.$refs.progressBar.clientWidth-this.circle;
                let newPercent = this.$refs.inner.clientWidth / barWidth;
                this.$emit('percentChangeEnd',newPercent)
            },
            _move(left){
                this.$refs.inner.style.width = `${left}px`
            },
            _percentChange(){
                let barWidth=this.$refs.progressBar.clientWidth-this.circle;
                let newPercent = this.$refs.inner.clientWidth / barWidth;
                this.$emit('percentChange',newPercent)
            }
        }
    }
</script>

<style scoped lang="scss">
    .progress-wrapper{
        width:100%;
        .bar{
            height:.05rem;
            background:rgba(0,0,0,.3);
            .inner{
                width:0;
                height:100%;
                background:#FFCD32;
                position:relative;
                .circle{
                    position:absolute;
                    top:0;
                    right:0;
                    width:.4rem;
                    height:.4rem;
                    background:#fff;
                    border-radius:50%;
                    padding:.1rem;
                    box-sizing: border-box;
                    transform: translate(100%,-50%);
                    i{
                        display: inline-block;
                        width:.2rem;
                        height:.2rem;
                        border-radius:50%;
                        background:#FFCD32;
                    }
                }
            }

        }
    }
</style>