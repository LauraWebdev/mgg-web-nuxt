<template>
    <router-link :to="{ name: 'game-id', params: { id: id }}" class="game-item">
        <div class="cover" :style="`background-image: url('${ coverFileName }')`">
            <div class="cover-actions" v-if="$store.state.userToken && $props.mode != 'delete'">
                <div class="action action-withhover" @click="addToPlaylist" v-if="!apiLoading && !apiSuccessful"><span class="mdi mdi-bookmark-plus-outline"></span></div>
                <div class="action loading" v-if="apiLoading"><span class="mdi mdi-loading"></span></div>
                <div class="action action-red" v-if="!apiLoading && apiSuccessful"><span class="mdi mdi-bookmark-plus"></span></div>
            </div>
            <div class="cover-actions" v-if="$store.state.userToken && $props.mode == 'delete'">
                <div class="action action-withhover action-red" @click="deleteFromPlaylist" v-if="!apiLoading && !apiSuccessful"><span class="mdi mdi-bookmark-minus"></span></div>
                <div class="action loading" v-if="apiLoading"><span class="mdi mdi-loading"></span></div>
                <div class="action" v-if="!apiLoading && apiSuccessful"><span class="mdi mdi-bookmark-plus-outline"></span></div>
            </div>
        </div>
        <div class="title">{{ title }}</div>
        <div class="user">
            <div class="avatar" :style="`background-image: url('${ user.avatarFileName }')`"></div>
            <div class="username">{{ user.username }}</div>
        </div>
    </router-link>
</template>

<script>
    import MGGApi from '@/modules/api';

    export default {
        name: 'GameItem',
        props: {
            id: {
                type: Number,
                default: 0
            },
            title: {
                type: String,
                default: ''
            },
            coverFileName: {
                type: String,
                default: ''
            },
            user: {
                type: Object,
                default: null
            },
            mode: {
                type: String,
                default: ''
            }
        },
        data: function () {
            return {
                apiRef: null,
                apiLoading: false,
                apiSuccessful: false,
            };
        },
        created: function () {
            this.$data.apiRef = new MGGApi();
        },
        methods: {
            addToPlaylist: async function (event) {
                event.preventDefault();

                this.$data.apiLoading = true;
                this.$data.apiSuccessful = false;

                try {
                    await this.$data.apiRef.addToPlaylist(this.$store.state.userData.playlists[0].id, this.$props.id, this.$store.state.userToken);

                    this.$data.apiLoading = false;
                    this.$data.apiSuccessful = true;

                    this.$root.$emit('addSnackbar', {
                        type: 'success',
                        icon: 'bookmark-plus',
                        text: this.$t('game.snackbar.success.addToPlaylist', { gameTitle: this.$props.title }),
                        stay: false,
                    });
                } catch (error) {
                    switch (error.name) {
                        case 'PlaylistGameConflictException':
                            this.$root.$emit('addSnackbar', {
                                type: 'success',
                                icon: 'bookmark-plus',
                                text: this.$t('game.snackbar.success.addToPlaylist', { gameTitle: this.$props.title }),
                                stay: false,
                            });
                            this.$data.apiSuccessful = true;
                            break;
                        default:
                            this.$root.$emit('addSnackbar', {
                                type: 'error',
                                icon: 'bookmark-plus',
                                text: this.$t('game.snackbar.error.addToPlaylistServerError'),
                                stay: true,
                            });
                            this.$data.apiSuccessful = false;
                            break;
                    }

                    this.$data.apiLoading = false;
                }
            },
            deleteFromPlaylist: async function (event) {
                event.preventDefault();

                this.$data.apiLoading = true;
                this.$data.apiSuccessful = false;

                try {
                    await this.$data.apiRef.deleteFromPlaylist(this.$store.state.userData.playlists[0].id, this.$props.id, this.$store.state.userToken);

                    this.$data.apiLoading = false;
                    this.$data.apiSuccessful = true;

                    this.$root.$emit('addSnackbar', {
                        type: 'success',
                        icon: 'bookmark-minus',
                        text: this.$t('game.snackbar.success.deleteFromPlaylist', { gameTitle: this.$props.title }),
                        stay: false,
                    });
                } catch (error) {
                    this.$root.$emit('addSnackbar', {
                        type: 'error',
                        icon: 'bookmark-minus',
                        text: this.$t('game.snackbar.error.deleteFromPlaylistServerError'),
                        stay: false,
                    });
                    this.$data.apiSuccessful = false;

                    this.$data.apiLoading = false;
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .game-item {
        display: grid;
        grid-gap: 5px;
        text-decoration: none;

        & .cover {
            background: rgba(0,0,0,0.1);
            background-position: center;
            background-size: cover;
            border-radius: 10px;
            width: 100%;
            padding-top: 56.25%;
            margin-bottom: 5px;
            position: relative;
            overflow: hidden;

            & .cover-actions {
                position: absolute;
                top: 0px;
                bottom: 0px;
                left: 0px;
                right: 0px;
                opacity: 0;
                background: rgba(0,0,0,0.4);
                transition: 0.2s ease-in-out opacity;
                display: flex;
                justify-content: center;
                align-items: center;

                & .action {
                    margin: 10px;
                    width: 56px;
                    height: 56px;
                    color: #222;
                    background: #fff;
                    font-size: 24px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: 0.2s ease-in-out opacity;

                    &.action-withhover:hover {
                        opacity: 0.6;
                    }

                    &.loading {
                        font-size: 32px;
                        animation: loadingAnim 0.6s ease-in-out infinite;
                    }
                    &.action-red {
                        color: #fd084d;
                    }
                }
            }

            &:hover {
                & .cover-actions {
                    opacity: 1;
                }
            }
        }
        & .title {
            font-size: 18px;
            font-weight: bold;
            letter-spacing: -0.05em;
            transition: 0.2s ease-in-out opacity;
        }
        & .user {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 10px;
            align-content: center;
            transition: 0.2s ease-in-out opacity;

            & .avatar {
                width: 24px;
                height: 24px;
                background: rgba(0,0,0,0.1);
                background-position: center;
                background-size: cover;
                border-radius: 50%;
            }
            & .username {
                overflow: hidden;
            }
        }

        &:hover {
            cursor: pointer;

            & .title {
                opacity: 0.6;
            }
            & .user {
                opacity: 0.6;
            }
        }
    }

    @keyframes loadingAnim {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
