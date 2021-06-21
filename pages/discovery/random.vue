<template>
    <div class="page-centered">
        <div class="page-wrapper">
            <GameList>
                <GameItem v-for="game in randomGames" :key="game.id" v-bind="game"></GameItem>
            </GameList>
        </div>

        <div class="page-wrapper actions">
            <button class="button button-filled" :disabled="page < 1" @click="previousPage()">{{ $t('index.previousPage') }}</button>
            <button class="button button-filled" :disabled="randomGames.length < 11" @click="nextPage()">{{ $t('index.nextPage') }}</button>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import GameList from '@/components/Game/GameList';
    import GameItem from '@/components/Game/GameItem';

    export default {
        name: 'DiscoveryRandom',
        meta: {
            title: 'Random',
        },
        components: {
            GameList,
            GameItem,
        },
        data: function () {
            return {
                apiRef: null,
                randomGames: [],
                page: 0,
            };
        },
        created: function () {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function () {
            this.fetchRandomGames();
        },
        methods: {
            fetchRandomGames: async function () {
                this.$data.randomGames = [];
                try {
                    this.$data.randomGames = await this.$data.apiRef.getDiscoveryGames('random', this.$data.page);
                } catch (error) {
                }
            },
            nextPage: function () {
                this.$data.page++;
                this.fetchRandomGames();
            },
            previousPage: function () {
                this.$data.page--;
                this.fetchRandomGames();
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
