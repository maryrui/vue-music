<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "index",
        props:{
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll:{
                type:Boolean,
                default:true
            }
        },
        mounted(){
            setTimeout(()=>{
                this.initScroll();
            })
        },
        methods:{
            initScroll(){
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll=new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
                if (this.listenScroll) {
                    let _this = this
                    this.scroll.on('scroll', (pos) => {
                        // console.log(pos);
                        _this.$emit('scroll', pos)
                    })
                }
            },
            scrollToElement () {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        width:100%;
        height:100%;
    }
</style>