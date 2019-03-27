<template>
    <div class="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :width="radius" :height="radius">
            <circle class="progress-background" r="15" cx="16" cy="15" fill="transparent"/>
            <circle class="progress-bar" r="15" cx="16" cy="15" fill="transparent" :stroke-dasharray="dashArray"
                    />
            <slot></slot>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                dashArray: Math.PI * 100
            }
        },
        props:{
            radius:{
                type:Number,
                default:100
            }
        }
    }
</script>

<style scoped lang="scss">
    .circle{
        position:relative;
        circle{
            width:100%;
            transform: scale(0.9);
            stroke-width:2px;
        }
        & .progress-background{
            stroke:#f1f1f1;
        }
        & .progress-bar{
            stroke:#ff5044;
        }
    }
</style>