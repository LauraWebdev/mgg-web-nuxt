<template>
    <div class="page-centered">
        <div class="page-wrapper">
            <GameList>
                <GameItem v-for="game in popularGames" :key="game.id" v-bind="game"></GameItem>
            </GameList>
        </div>

        <div class="page-wrapper actions">
            <button class="button button-filled" :disabled="page < 1" @click="previousPage()">{{ $t('index.previousPage') }}</button>
            <button class="button button-filled" :disabled="popularGames.length < 11" @click="nextPage()">{{ $t('index.nextPage') }}</button>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import GameList from '@/components/Game/GameList';
    import GameItem from '@/components/Game/GameItem';

    export default {
        name: 'DiscoveryNewest',
        meta: {
            title: 'Most popular games',
        },
        components: {
            GameList,
            GameItem,
        },
        data: function () {
            return {
                apiRef: null,
                popularGames: [],
                page: 0,
            };
        },
        created: function () {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function () {
            this.fetchPopularGames();
        },
        methods: {
            fetchPopularGames: async function () {
                this.$data.popularGames = [];
                try {
                    this.$data.popularGames = await this.$data.apiRef.getDiscoveryGames('popular', this.$data.page);
                } catch (error) {
                }
            },
            nextPage: function () {
                this.$data.page++;
                this.fetchPopularGames();
            },
            previousPage: function () {
                this.$data.page--;
                this.fetchPopularGames();
            }
        }
    };
</script>

<style lang="less" scoped>
    .page-discovery {
        padding: 50px 0px;
    }
    .actions {
        display: flex;
        justify-content: center;
        margin-top: 50px;

        & button {
            margin: 0px 7px;
        }
    }
</style>
