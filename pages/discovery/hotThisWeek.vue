<template>
    <div class="page-centered">
        <div class="page-wrapper">
            <GameList>
                <GameItem v-for="game in hotGames" :key="game.id" v-bind="game"></GameItem>
            </GameList>
        </div>

        <div class="page-wrapper actions">
            <button class="button button-filled" :disabled="page < 1" @click="previousPage()">{{ $t('index.previousPage') }}</button>
            <button class="button button-filled" :disabled="hotGames.length < 11" @click="nextPage()">{{ $t('index.nextPage') }}</button>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import GameList from '@/components/Game/GameList';
    import GameItem from '@/components/Game/GameItem';

    export default {
        name: 'DiscoveryHotThisWeek',
        meta: {
            title: 'Hot this week',
        },
        components: {
            GameList,
            GameItem,
        },
        data: function () {
            return {
                apiRef: null,
                hotGames: [],
                page: 0,
            };
        },
        created: function () {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function () {
            this.fetchHotThisWeekGames();
        },
        methods: {
            fetchHotThisWeekGames: async function () {
                this.$data.hotGames = [];
                try {
                    this.$data.hotGames = await this.$data.apiRef.getDiscoveryGames('hotThisWeek', this.$data.page);
                } catch (error) {
                }
            },
            nextPage: function () {
                this.$data.page++;
                this.fetchHotThisWeekGames();
            },
            previousPage: function () {
                this.$data.page--;
                this.fetchHotThisWeekGames();
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
