<template>
    <div class="page-channelOverview">
        <div class="channel-loading" v-if="$fetchState.pending">
            <LoadingCircle />
        </div>
        <div class="page-centered page-header" v-if="!apiLoading && channelDetail != null">
            <div class="page-wrapper">
                <h1>{{ channelDetail.title }}</h1>
                <p>{{ channelDetail.description }}</p>
            </div>
        </div>

        <div class="page-centered page-channelList" v-if="!apiLoading && channelDetail != null">
            <div class="page-wrapper">
                <GameList>
                    <GameItem v-for="game in channelDetail.games" v-bind:key="game.id" v-bind="game"></GameItem>
                </GameList>
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
        name: 'ChannelDetail',
        metaInfo: {
            title: 'Channel detail',
        },
        components: {
            LoadingCircle,
            GameList,
            GameItem,
        },
        data: function () {
            return {
                apiRef: null,
                apiLoading: false,
                channelDetail: null,
            }
        },
        created: function () {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function () {
            this.fetchChannelDetail(this.$router.currentRoute.params.id);
        },
        methods: {
            fetchChannelDetail: async function (channelID) {
                this.$data.apiLoading = true;

                try {
                    this.$data.channelDetail = await this.$data.apiRef.getChannelDetail(channelID, this.$store.state.userToken);

                    document.title = `#${this.$data.channelDetail.title} games ~ MyGarage.games`;

                    this.$data.apiLoading = false;
                } catch (error) {
                    switch (error.name) {
                        case 'GameChannelNotFoundException':
                            this.$root.$emit('addSnackbar', {
                                type: 'error',
                                icon: 'gamepad-square',
                                text: this.$t('channelDetail.snackbar.notFound'),
                                stay: true,
                            });
                            break;
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: 'error',
                                icon: 'gamepad-square',
                                text: this.$t('channelDetail.snackbar.serverError'),
                                stay: true,
                            });
                            break;
                    }

                    this.$data.apiLoading = false;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-channelList {
        margin: 50px 0px;
    }
    .channel-loading {
        padding: 150px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
