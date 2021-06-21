<template>
    <div class="page-centered">
        <div class="page-wrapper page-loading" v-if="apiLoading">
            <LoadingCircle />
        </div>
        <div class="page-wrapper page-moderation-list" v-if="!apiLoading">
            <div class="header">
                <div>ID</div>
                <div>Title</div>
                <div>Creator</div>
                <div>Actions</div>
            </div>
            <div class="item" v-for="game in queueGames" v-bind:key="game.id">
                <div>{{ game.id }}</div>
                <div>{{ game.title }}</div>
                <div>{{ game.user.username }}</div>
                <div>
                    <router-link :to="{ name: 'GameDetail', params: { id: game.id } }" target="_blank" class="button">Show</router-link>
                    <router-link :to="{ name: 'GameEdit', params: { id: game.id } }" target="_blank" class="button">Edit</router-link>
                    <button class="button button-filled" v-on:click="deleteFromQueue( game.id )">Flag as Seen</button>
                </div>
            </div>
            <div class="noresults" v-if="queueGames.length == 0">
                Nothing to do, thank you for your service! :)
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '../../modules/api';
    
    import LoadingCircle from '@/components/General/LoadingCircle';

    export default {
        name: 'ModerationQueue',
        metaInfo: {
            title: 'Moderation Queue',
        },
        components: {
            LoadingCircle
        },
        data: function() {
            return {
                apiRef: null,
                apiLoading: true,
                queueGames: []
            }
        },
        created: function() {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function() {
            this.loadQueue();
        },
        methods: {
            loadQueue: async function() {
                this.$data.apiLoading = true;
                try {
                    this.$data.queueGames = await this.$data.apiRef.getModerationQueue(this.$store.state.userToken);
                    this.$data.apiLoading = false;
                } catch(error) {
                    console.error(error);
                }
            },
            deleteFromQueue: async function(gameID) {
                this.$data.apiLoading = true;

                try {
                    await this.$data.apiRef.deleteFromModerationQueue(gameID, this.$store.state.userToken);

                    this.loadQueue();

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "content-save-outline",
                        text: "Game was deleted from moderation queue.",
                        stay: false,
                    });
                } catch(error) {
                    this.$data.apiLoading = false;

                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "content-save-outline",
                                text: "Game couldn't be deleted from moderation queue due to a server error.",
                                stay: true,
                            });
                            return;
                        case "GameNotFoundException":
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "content-save-outline",
                                text: "This game does not exist anymore.",
                                stay: false,
                            });
                            return;
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-loading {
        margin: 100px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & .page-moderation-list {
        display: grid;
        border-radius: 5px;
        border: 2px solid rgba(0,0,0,0.14);

        & .header {
            padding: 5px 10px;
            display: grid;
            font-weight: bold;
            background: rgba(0,0,0,0.07);
            grid-template-columns: 50px 1fr 250px 290px;
        }

        & .item {
            padding: 5px 10px;
            display: grid;
            border-top: 2px solid rgba(0,0,0,0.14);
            grid-template-columns: 50px 1fr 250px 290px;
            align-items: center;

            & .button {
                margin-right: 5px;
            }

            &:hover {
                background: rgba(0,0,0,0.035);
            }
        }

        & .noresults {
            border-top: 2px solid rgba(0,0,0,0.14);
            padding: 50px 0px;
            text-align: center;
            opacity: 0.6;
        }
    }

    .theme-dark {
        & .page-moderation-list {
            border-color: rgba(255,255,255,0.4);

            & .header {
                background: rgba(255,255,255,0.14);
            }

            & .item {
                border-top-color: rgba(255,255,255,0.4);

                &:hover {
                    background: rgba(255,255,255,0.07);
                }
            }

            & .noresults {
                border-top-color: rgba(255,255,255,0.4);
            }
        }
    }
</style>
