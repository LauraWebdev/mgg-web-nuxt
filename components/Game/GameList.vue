<template>
    <div class="game-list">
        <div class="title" v-if="title">{{ title }}</div>
        <div class="list">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GameList',
        props: [
            'title',
        ]
    }
</script>

<style lang="less" scoped>
    .game-list {
        display: grid;
        grid-gap: 10px;
        
        & .title {
            font-weight: bold;
            font-size: 32px;
        }
        & .list {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 25px;
        }
    }

    @media screen and (max-width: 1300px) {
        .game-list {
            & .list {
                grid-template-columns: 1fr 1fr;
            }
        }
    }

    @media screen and (max-width: 800px) {
        .game-list {
            & .list {
                grid-template-columns: 1fr;
            }
        }
    }
</style>