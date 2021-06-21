<template>
    <div class="icon-item" v-on:click="toggleMode()">
        <span :class="`mdi mdi-theme-light-dark`"></span>
    </div>
</template>

<script>
    export default {
        name: 'HeaderThemeItem',
        methods: {
            toggleMode: function() {
                let newMode = 'light';
                if(this.$store.state.uiMode == 'light') {
                    newMode = 'dark';
                }

                this.$store.dispatch('setMode', newMode);
            }
        },
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
            cursor: pointer;
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