<template>
    <div class="page-gamedetail">
        <div class="game-loading" v-if="apiLoading || gameDetail == null">
            <LoadingCircle />
        </div>
        <div class="game-detail" v-if="!apiLoading && gameDetail != null">
            <div class="game-header" :style="`background-image: url('${gameDetail.coverFileName}')`" v-on:click="openTrailer()" v-if="gameDetail.youtubeID != '' && gameDetail.youtubeID != null">
                <div class="header-shade">
                    <span class="mdi mdi-play-circle-outline"></span>
                </div>
            </div>

            <div class="page-centered">
                <div class="page-wrapper page-thirdssplit">
                    <div class="game-meta">
                        <h1>{{ gameDetail.title }}</h1>
                        <router-link :to="{ name: 'UserDetail', params: { id: gameDetail.user.id } }" class="user">
                            <div class="avatar" :style="`background-image: url('${ gameDetail.user.avatarFileName }')`"></div>
                            <div class="username">{{ gameDetail.user.username }}</div>
                        </router-link>
                        <div class="gameID">
                            <div class="ingameID">{{ gameDetail.ingameID }}</div>
                            <div class="addToPlaylist" v-on:click="addToPlaylist" v-if="$store.state.userData != null && !isInPlaylist && !playlistActionLoading"><span class="mdi mdi-bookmark-plus-outline"></span></div>
                            <div class="addToPlaylist loading" v-if="$store.state.userData != null && playlistActionLoading"><span class="mdi mdi-loading"></span></div>
                            <div class="addToPlaylist" v-on:click="deleteFromPlaylist" v-if="$store.state.userData != null && isInPlaylist && !playlistActionLoading"><span class="mdi mdi-bookmark-minus"></span></div>
                        </div>
                        <div class="description" v-if="gameDetail.description != ''">
                            <nl2br tag="span" :text="gameDetail.description" />
                        </div>
                        <div class="meta-info">
                            <div class="item">
                                <div>Created</div>
                                <div>{{ createdFormatted }}</div>
                            </div>
                            <div class="item" v-if="gameDetail.updatedAt != gameDetail.createdAt">
                                <div>Updated</div>
                                <div>{{ updatedFormatted }}</div>
                            </div>
                        </div>
                        <div class="channels" v-if="gameDetail.channels.length > 0">
                            <router-link :to="{ name: 'ChannelDetail', params: { id: channel.id } }" class="item" v-for="channel in gameDetail.channels" v-bind:key="channel.id">{{ channel.title }}</router-link>
                        </div>

                        <div class="actions" v-if="$store.state.userData != null ? gameDetail.user.id == $store.state.userData.id || ['moderator', 'admin'].some(str => $store.state.userRoles.includes(str)) : false">
                            <LinkButton :to="{ name: 'GameEdit', params: { id: gameDetail.id } }" filled>{{ $t('gameDetail.action.edit') }}</LinkButton>
                            <LinkButton :to="{ name: 'GameDelete', params: { id: gameDetail.id } }">{{ $t('gameDetail.action.delete') }}</LinkButton>
                        </div>
                    </div>
                    <div class="game-screenshots">
                        <div class="screenshot"
                            :class="activeScreenshot == 0 ? 'active' : ''"
                            :style="`background-image: url('${gameDetail.coverFileName}');`"></div>
                        <div class="screenshot"
                            v-for="(screenshot, index) in gameDetail.screenshots"
                            v-bind:key="screenshot.id"
                            :class="activeScreenshot == index + 1 ? 'active' : ''"
                            :style="`background-image: url('${screenshot.fileName}');`"></div>

                        <div class="position-shade">
                            <div class="dot"
                                :class="activeScreenshot == 0 ? 'active' : ''"
                                v-on:click="changeActiveScreenshot(0)"></div>
                            <div class="dot"
                                v-for="(screenshot, index) in gameDetail.screenshots"
                                v-bind:key="screenshot.id"
                                :class="activeScreenshot == index + 1 ? 'active' : ''"
                                v-on:click="changeActiveScreenshot(index + 1)"></div>
                        </div>

                        <div class="navigate-previous" v-on:click="previousScreenshot()"><span class="mdi mdi-arrow-left"></span></div>
                        <div class="navigate-next" v-on:click="nextScreenshot()"><span class="mdi mdi-arrow-right"></span></div>
                    </div>
                </div>
            </div>

            <div class="page-centered">
                <div class="page-wrapper page-thirdssplit page-comments">
                    <div class="comment-form comment-text" v-if="$store.state.userData == null" v-html="$t('gameDetail.comments.form.notLoggedIn')"></div>
                    <div class="comment-form" v-if="!newCommentActionLoading && $store.state.userData != null">
                        <textarea v-model="newCommentText" class="input"></textarea>
                        <button class="button button-filled" v-on:click="addComment()">{{ $t('gameDetail.comments.form.commentButton') }}</button>
                    </div>
                    <div class="comment-form comment-loading" v-if="newCommentActionLoading && $store.state.userData != null">
                        <LoadingCircle />
                    </div>
                    <div class="comment-nocomments" v-if="gameDetail.comments.length == 0">
                        {{ $t('gameDetail.comments.noComments') }}
                    </div>
                    <CommentList v-if="gameDetail.comments.length > 0">
                        <Comment v-for="comment in gameDetail.comments" v-bind="comment" v-bind:key="comment.id" />
                    </CommentList>
                </div>
            </div>

            <div class="trailer-overlay" v-if="trailerOverlayOpen">
                <div class="video-embed">
                    <div class="video-16by9">
                        <iframe width="100%" height="100%" :src="`https://www.youtube-nocookie.com/embed/${gameDetail.youtubeID}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>

                <div v-on:click="closeTrailer()" class="close-button">{{ $t('gameDetail.trailerOverlay.closeButton') }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import LoadingCircle from '@/components/General/LoadingCircle';
    import LinkButton from '@/components/General/LinkButton';
    import CommentList from '@/components/Comments/CommentList';
    import Comment from '@/components/Comments/Comment';

    export default {
        name: 'GameDetail',
        metaInfo: {
            title: 'Game detail',
        },
        data: function() {
            return {
                apiRef: null,
                apiLoading: true,
                trailerOverlayOpen: false,
                gameDetail: null,
                createdFormatted: "",
                updatedFormatted: "",
                activeScreenshot: 0,
                isInPlaylist: false,
                playlistActionLoading: false,
                newCommentText: "",
                newCommentActionLoading: false,
            }
        },
        components: {
            LoadingCircle,
            LinkButton,
            CommentList,
            Comment
        },
        created: function() {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function() {
            this.loadGame();

            this.$root.$on('deleteComment', (commentID) => {
                this.deleteComment(commentID);
            });
        },
        methods: {
            loadGame: async function() {
                this.$data.apiLoading = true;

                try {
                    let gameResponse = await this.$data.apiRef.getGameDetail(this.$router.currentRoute.params.id, this.$store.state.userToken);
                    this.$data.gameDetail = gameResponse.game;
                    this.$data.isInPlaylist = gameResponse.isInPlaylist;
                    this.$data.apiLoading = false;

                    document.title = `${this.$data.gameDetail.title} by ${this.$data.gameDetail.user.username} ~ MyGarage.games`;

                    this.$data.createdFormatted = new Date(Date.parse(this.$data.gameDetail.createdAt)).toLocaleDateString("en-US");
                    this.$data.updatedFormatted = new Date(Date.parse(this.$data.gameDetail.updatedAt)).toLocaleDateString("en-US");
                } catch(error) {
                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "gamepad-square",
                                text: this.$t('gameDetail.snackbar.error.serverError'),
                                stay: true,
                            });
                            break;
                        case "GameNotFoundException":
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "gamepad-square",
                                text: this.$t('gameDetail.snackbar.error.notFound'),
                                stay: true,
                            });
                            break;
                        case "GamePrivateException":
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "gamepad-square",
                                text: this.$t('gameDetail.snackbar.error.private'),
                                stay: true,
                            });
                            break;
                    }

                    this.$data.apiLoading = false;
                }
            },
            loadComments: async function() {
                try {
                    let gameResponse = await this.$data.apiRef.getGameDetail(this.$router.currentRoute.params.id, this.$store.state.userToken);
                    this.$data.gameDetail.comments = gameResponse.game.comments;
                } catch(error) {
                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "comment-processing",
                                text: this.$t('gameDetail.snackbar.comments.error.serverError'),
                                stay: true,
                            });
                            break;
                    }
                }
            },
            openTrailer: function() {
                this.$data.trailerOverlayOpen = true;
            },
            closeTrailer: function() {
                this.$data.trailerOverlayOpen = false;
            },
            addToPlaylist: async function(event) {
                event.preventDefault();

                this.$data.playlistActionLoading = true;

                try {
                    await this.$data.apiRef.addToPlaylist(this.$store.state.userData.playlists[0].id, this.$data.gameDetail.id, this.$store.state.userToken);

                    this.$data.playlistActionLoading = false;
                    this.$data.isInPlaylist = true;

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "bookmark-plus",
                        text: this.$t('game.snackbar.success.addToPlaylist', {gameTitle: this.$data.gameDetail.title}),
                        stay: false,
                    });
                } catch(error) {
                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "bookmark-plus",
                                text: this.$t('game.snackbar.error.addToPlaylistServerError'),
                                stay: true,
                            });
                            break;
                        case "PlaylistGameConflictException":
                            this.$root.$emit('addSnackbar', {
                                type: "success",
                                icon: "bookmark-plus",
                                text: this.$t('game.snackbar.success.addToPlaylist', {gameTitle: this.$data.gameDetail.title}),
                                stay: false,
                            });
                            this.$data.isInPlaylist = true;
                            break;
                    }

                    this.$data.playlistActionLoading = false;
                }
            },
            deleteFromPlaylist: async function(event) {
                event.preventDefault();

                this.$data.playlistActionLoading = true;

                try {
                    await this.$data.apiRef.deleteFromPlaylist(this.$store.state.userData.playlists[0].id, this.$data.gameDetail.id, this.$store.state.userToken);

                    this.$data.playlistActionLoading = false;
                    this.$data.isInPlaylist = false;

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "bookmark-minus",
                        text: this.$t('game.snackbar.success.deleteFromPlaylist', {gameTitle: this.$data.gameDetail.title}),
                        stay: false,
                    });
                } catch(error) {
                    console.error(error);
                    this.$root.$emit('addSnackbar', {
                        type: "error",
                        icon: "bookmark-minus",
                        text: this.$t('game.snackbar.error.deleteFromPlaylistServerError'),
                        stay: false,
                    });

                    this.$data.playlistActionLoading = false;
                }
            },
            addComment: async function() {
                this.$data.newCommentActionLoading = true;

                if(this.$data.newCommentText == "") {
                    this.$root.$emit('addSnackbar', {
                        type: "error",
                        icon: "comment-processing",
                        text: this.$t('gameDetail.snackbar.comments.notEmpty'),
                        stay: false,
                    });
                    this.$data.newCommentActionLoading = false;
                    return;
                }

                try {
                    await this.$data.apiRef.createGameComment(this.$data.newCommentText, this.$data.gameDetail.id, this.$store.state.userToken);

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "comment-processing",
                        text: this.$t('gameDetail.snackbar.comments.success.posted'),
                        stay: false,
                    });

                    this.$data.newCommentText = "";

                    this.$data.newCommentActionLoading = false;
                    this.loadComments();
                } catch(error) {
                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "comment-processing",
                                text: this.$t('gameDetail.snackbar.comments.error.postedServerError'),
                                stay: true,
                            });
                            break;
                    }

                    this.$data.newCommentActionLoading = false;
                    this.loadComments();
                }
            },
            deleteComment: async function(commentID) {
                try {
                    await this.$data.apiRef.deleteGameComment(commentID, this.$store.state.userToken);

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "comment-processing",
                        text: this.$t('gameDetail.snackbar.comments.success.deleted'),
                        stay: false,
                    });

                    this.loadComments();
                } catch(error) {
                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "comment-processing",
                                text: this.$t('gameDetail.snackbar.comments.error.deletedServerError'),
                                stay: true,
                            });
                            break;
                    }

                    this.loadComments();
                }
            },
            changeActiveScreenshot: function(screenshotIndex) {
                this.$data.activeScreenshot = screenshotIndex;
            },
            previousScreenshot: function() {
                if(this.$data.activeScreenshot > 0) {
                    this.$data.activeScreenshot--;
                } else {
                    this.$data.activeScreenshot = this.$data.gameDetail.screenshots.length;
                }
            },
            nextScreenshot: function() {
                if(this.$data.activeScreenshot < this.$data.gameDetail.screenshots.length) {
                    this.$data.activeScreenshot++;
                } else {
                    this.$data.activeScreenshot = 0;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .game-loading {
        padding: 150px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & .game-header {
        width: 100%;
        height: 300px;
        background-position: center;
        background-size: cover;
        position: relative;
    }
    & .header-shade {
        background: linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        backdrop-filter: blur(5px);
        transition: 0.2s ease-in-out all;

        & .mdi {
            font-size: 64px;
            color: #fff;
            transition: 0.2s ease-in-out opacity;
        }
        &:hover {
            backdrop-filter: blur(0px);

            & .mdi {
                opacity: 0.6;
            }
        }
    }
    & .page-thirdssplit {
        display: grid;
        grid-template-columns: minmax(350px, 1fr) 2fr;
        grid-gap: 25px;
        padding: 50px 0px;
    }
    & .trailer-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.6);
        z-index: 100;

        & .video-embed {
            max-width: 960px;
            width: 80%;

            & .video-16by9 {
                width: 100%;
                padding-top: 56.25%;
                position:  relative;

                & iframe {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                }
            }
        }
        & .close-button {
            color: #fff;
            border: 2px solid #fff;
            border-radius: 5px;
            font-weight: bold;
            padding: 7px 25px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 12px;
            transition: 0.2s ease-in-out background, 0.2s ease-in-out color;
            font-family: 'Poppins', sans-serif;
            margin-top: 25px;

            &:hover {
                color: #000;
                background: #fff;
                cursor: pointer;
            }
            &:focus {
                outline: none;
            }
        }
    }
    & .game-meta {
        & h1 {
            font-weight: bold;
            font-size: 32px;
            margin: 0;
        }
        & .gameID {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-gap: 15px;
            margin-bottom: 15px;

            & .ingameID {
                background: #25baff44;
                color: #1EA0DE;
                font-size: 18px;
                display: flex;
                align-items: center;
                font-weight: bold;
                padding: 8px 20px;
                border-radius: 100px;
            }
            & .addToPlaylist {
                background: #25B9FF;
                border: 2px solid #1a8fc5;
                color: #fff;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                transition: 0.2s ease-in-out background;

                &:hover {
                    background: #1a8fc5;
                    cursor: pointer;
                }
                &.loading {
                    font-size: 32px;
                    animation: loadingAnim 0.6s ease-in-out infinite;
                }
            }
        }
        & .user {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 10px;
            align-content: center;
            transition: 0.2s ease-in-out opacity;
            text-decoration: none;
            margin-bottom: 25px;

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

            &:hover {
                opacity: 0.4;
            }
        }
        & .description {
            line-height: 1.5em;
            margin-bottom: 25px;
        }
        & .meta-info {
            display: grid;
            grid-gap: 10px;
            margin-bottom: 25px;

            & .item {
                display: grid;
                grid-template-columns: 1fr 2fr;
                grid-gap: 15px;

                & div:nth-child(1) {
                    opacity: 0.6;
                }
            }
        }
        & .channels {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;

            & .item {
                padding: 4px 12px;
                background: #25baff44;
                color: #1EA0DE;
                border-radius: 100px;
                margin-right: 5px;
                margin-bottom: 5px;
                transition: 0.2s ease-in-out all;
                text-decoration: none;

                &:hover {
                    background: #1EA0DE;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
        & .actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 15px;

            & .button {
                text-align: center;
            }
        }
    }
    & .game-screenshots {
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        align-self: flex-start;

        & .screenshot {
            display: none;
            padding-top: 56.25%;
            background-position: center;
            background-size: cover;

            &.active {
                display: block;
            }
        }

        & .position-shade {
            position: absolute;
            background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.6));
            bottom: 0px;
            padding: 20px;
            left: 0px;
            right: 0px;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;

            & .dot {
                border: 2px solid #fff;
                border-radius: 100%;
                width: 14px;
                height: 14px;
                margin: 0px 5px;
                
                &.active {
                    background: #fff;
                }
                &:not(.active):hover {
                    background: rgba(255,255,255,0.4);
                    cursor: pointer;
                }
            }
        }

        & .navigate-previous, & .navigate-next {
            background: linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0));
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            padding: 25px;
            right: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #fff;
            font-size: 32px;
            opacity: 0;
            transition: 0.2s ease-in-out opacity;

            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }

        & .navigate-next {
            background: linear-gradient(-90deg, rgba(0,0,0,0.6), rgba(0,0,0,0));
            left: 50%;
            right: 0;
            justify-content: flex-end;
        }
    }
    & .comment-form {
        background: rgba(0,0,0,0.07);
        padding: 15px;
        border-radius: 5px;
        display: grid;
        grid-template-rows: 120px auto;
        grid-template-columns: 1fr;
        grid-gap: 15px;
        align-self: flex-start;

        &.comment-loading {
            display: flex;
            padding: 50px 0px;
            justify-content: center;
        }
        &.comment-text {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            opacity: 0.6;
            padding: 50px 25px;
        }
    }
    & .comment-nocomments {
        background: rgba(0,0,0,0.07);
        border-radius: 5px;
        padding: 50px 25px;
        opacity: 0.6;
        align-self: flex-start;
        text-align: center;
    }

    .theme-dark {
        & .comment-form {
            background: rgba(255,255,255,0.07);
        }
        & .comment-nocomments {
            background: rgba(255,255,255,0.07);
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

    @media screen and (max-width: 1300px) {
        .game-header {
            height: 200px;
        }

        .page-comments {
            grid-template-columns: 1fr;
        }
    }

    @media screen and (max-width: 800px) {
        .page-thirdssplit {
            grid-template-columns: 1fr;
        }
    }
</style>