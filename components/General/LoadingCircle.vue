<template>
    <div class="loading">
        <div class="loading-item"></div>
        <div class="loading-item"></div>
        <div class="loading-item"></div>
    </div>
</template>

<script>
    export default {
        name: 'LoadingCircle',
        props: [
        ]
    }
</script>

<style lang="less" scoped>
    .loading {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 15px;
        align-items: center;

        & .loading-item {
            justify-self: center;
            width: 14px;
            height: 14px;
            background: #25b9ff;
            border-radius: 50px;
            animation: loadingAnim 1s ease-in-out infinite;

            &:nth-child(1) {
                animation-delay: 0s;
            }
            &:nth-child(2) {
                animation-delay: 0.2s;
            }
            &:nth-child(3) {
                animation-delay: 0.4s;
            }
        }
    }

    @keyframes loadingAnim {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
</style>