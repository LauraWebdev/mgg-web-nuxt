<template>
    <div class="page-search">
        <div class="page-centered page-header">
            <div class="page-wrapper">
                <h1>{{ $t('find.header') }}</h1>
                <input type="text" v-model="searchQuery" v-on:input="changeSearch" ref="searchInput" class="input" :placeholder="$t('find.searchboxPlaceholder')" />
            </div>
        </div>

        <div class="search-loading" v-if="apiLoading">
            <LoadingCircle />
        </div>

        <div class="page-centered page-searchResultsList" v-if="results != null && !apiLoading">
            <div class="page-wrapper">
                <GameList v-if="results.length > 0">
                    <GameItem v-for="game in results" v-bind:key="game.id" v-bind="game" />
                </GameList>

                <div class="empty-results" v-if="results.length == 0" v-html="$t('find.noresults')"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import LoadingCircle from '@/components/General/LoadingCircle';
    import GameList from '@/components/Game/GameList';
    import GameItem from '@/components/Game/GameItem';

    export default {
        name: 'Search',
        components: {
            LoadingCircle,
            GameList,
            GameItem,
        },
        data: function () {
            return {
                apiRef: null,
                searchQuery: '',
                apiLoading: false,
                results: null,
                searchTimeout: null
            }
        },
        created: function () {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function () {
            this.$refs.searchInput.focus();

            if (this.$route.query.q !== '' && this.$route.query.q !== undefined) {
                this.$data.searchQuery = this.$route.query.q;
                this.processSearch();
            }
        },
        methods: {
            changeSearch: function () {
                if (this.$data.searchTimeout) {
                    clearTimeout(this.$data.searchTimeout);
                }

                this.$data.searchTimeout = setTimeout(() => {
                    this.$router.push({ path: '/search', query: { q: this.$data.searchQuery } });
                }, 1000);
            },
            processSearch: async function () {
                this.$data.apiLoading = true;
                this.$data.results = [];

                if (this.$data.searchQuery === '') {
                    this.$data.apiLoading = false;
                    return;
                }

                try {
                    this.$data.apiLoading = true;
                    this.$data.results = await this.$data.apiRef.getQueryGames(this.$data.searchQuery, this.$store.state.userToken);
                    this.$data.apiLoading = false;
                } catch (error) {
                    console.error(error);

                    this.$data.results = null;
                    this.$data.apiLoading = false;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .search-loading {
        padding: 150px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .page-header {
        & .page-wrapper {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 40px;
            align-items: center;
        }
    }
    .page-searchResultsList {
        padding: 50px 0px;
    }
    .empty-results {
        padding: 50px;
        background: rgba(0,0,0,0.07);
        border-radius: 4px;
        text-align: center;
        color: rgba(0,0,0,0.6);
    }
</style>
