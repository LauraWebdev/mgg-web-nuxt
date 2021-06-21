<template>
    <router-link :to="route" class="icon-item">
        <span :class="`mdi mdi-${icon}`"></span>
    </router-link>
</template>

<script>
    export default {
        name: 'HeaderIconItem',
        props: ['route', 'icon'],
    }
</script>

<style lang="less" scoped>
    .icon-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 54px;
        font-size: 26px;
        border: 3px solid transparent;
        color: #222;

        &:hover {
            border-bottom-color: rgba(0,0,0,0.2);
        }
        &.router-link-exact-active {
            border-bottom-color: #25B9FF;
        }
    }

    .theme-dark {
        & .icon-item {
            color: rgba(255,255,255,0.8);

            &:hover {
                border-bottom-color: rgba(255,255,255,0.2);
            }
        }
    }
</style>