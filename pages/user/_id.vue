<template>
    <div class="page-userdetail">
        <div class="user-loading" v-if="apiLoading || userDetail == null">
            <LoadingCircle />
        </div>
        <div class="user-detail" v-if="!apiLoading && userDetail != null">
            <div class="user-bar"></div>
            <div class="user-basic">
                <div class="avatar" :style="`background-image: url('${ userDetail.avatarFileName }')`"></div>
                <div class="username">{{ userDetail.username }}</div>
            </div>

            <div class="page-centered">
                <div class="page-wrapper page-thirdssplit">
                    <div class="user-meta">
                        <div class="meta-info">
                            <div class="item" v-if="userDetail.pronouns != null && userDetail.pronouns != ''">
                                <div class="property">{{ $t('userDetail.meta.pronouns') }}</div>
                                <div class="content">{{ userDetail.pronouns }}</div>
                            </div>
                            <div class="item" v-if="userDetail.ingameID != null && userDetail.ingameID != ''">
                                <div class="property">{{ $t('userDetail.meta.ingameID') }}</div>
                                <div class="content">{{ userDetail.ingameID }}</div>
                            </div>
                            <div class="item">
                                <div class="property">{{ $t('userDetail.meta.joinedDate') }}</div>
                                <div class="content">{{ createdFormatted }}</div>
                            </div>
                        </div>
                        <div class="meta-info" v-if="userDetail.socialDiscord != null && userDetail.socialDiscord != '' || userDetail.socialTwitter != null && userDetail.socialTwitter != '' || userDetail.socialYouTube != null && userDetail.socialYouTube != ''">
                            <div class="item" v-if="userDetail.socialDiscord != null && userDetail.socialDiscord != ''">
                                <div class="property">Discord</div>
                                <div class="content">{{ userDetail.socialDiscord }}</div>
                            </div>
                            <div class="item" v-if="userDetail.socialTwitter != null && userDetail.socialTwitter != ''">
                                <div class="property">Twitter</div>
                                <div class="content" v-if="showTwitterAsLink"><a :href="userDetail.socialTwitter" target="_blank">{{ userDetail.username }} on Twitter</a></div>
                                <div class="content" v-if="showTwitterAsAtLink"><a :href="`https://twitter.com/${userDetail.socialTwitter}`" target="_blank">{{ userDetail.username }} on Twitter</a></div>
                                <div class="content" v-if="!showTwitterAsAtLink && !showTwitterAsLink">{{ userDetail.socialTwitter }}</div>
                            </div>
                            <div class="item" v-if="userDetail.socialYouTube != null && userDetail.socialYouTube != ''">
                                <div class="property">YouTube</div>
                                <div class="content" v-if="showYouTubeAsLink"><a :href="userDetail.socialYouTube" target="_blank">{{ userDetail.username }} on YouTube</a></div>
                                <div class="content" v-if="!showYouTubeAsLink">{{ userDetail.socialYouTube }}</div>
                            </div>
                        </div>
                        <div class="team-banner" v-if="['moderator', 'admin'].some(str => userDetail.roles.includes(str))">
                            <span class="mdi mdi-shield-check"></span>
                            <span>{{ $t('userDetail.meta.teamVerified') }}</span>
                        </div>

                        <div class="actions" v-if="$store.state.userData ? userDetail.id == $store.state.userData.id || ['moderator', 'admin'].some(str => $store.state.userRoles.includes(str)) : false">
                            <LinkButton :to="{ name: 'UserEdit', params: { id: userDetail.id }}" filled>{{ $t('userDetail.action.edit') }}</LinkButton>
                        </div>

                        <div class="actions" v-if="$store.state.userData ? ['moderator', 'admin'].some(str => $store.state.userRoles.includes(str)) : false">
                            <LinkButton :to="{ name: 'ModerationBan', params: { id: userDetail.id }}">Ban User</LinkButton>
                        </div>
                    </div>
                    <div class="user-games" v-if="userDetail.games.length > 0">
                        <GameItem v-for="game in userDetail.games" v-bind:key="game.id" v-bind="game"></GameItem>
                    </div>
                    <div class="user-nogames" v-if="userDetail.games.length == 0">
                        {{ $t('userDetail.nogames') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import LoadingCircle from '@/components/General/LoadingCircle';
    import LinkButton from '@/components/General/LinkButton';
    import GameItem from '@/components/Game/GameItem';

    export default {
        name: 'UserDetail',
        metaInfo: {
            title: 'User detail',
        },
        data: function() {
            return {
                apiRef: null,
                apiLoading: true,
                userDetail: null,
                createdFormatted: "",
                showYouTubeAsLink: false,
                showTwitterAsLink: false,
                showTwitterAsAtLink: false,
            }
        },
        components: {
            LoadingCircle,
            LinkButton,
            GameItem,
        },
        created: function() {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function() {
            this.loadUser();
        },
        methods: {
            loadUser: async function() {
                this.$data.apiLoading = true;

                try {
                    this.$data.userDetail = await this.$data.apiRef.getUserDetail(this.$router.currentRoute.params.id, this.$store.state.userToken);
                    this.$data.apiLoading = false;

                    document.title = `${this.$data.userDetail.username}'s profile ~ MyGarage.games`;

                    this.$data.createdFormatted = new Date(Date.parse(this.$data.userDetail.createdAt)).toLocaleDateString("en-US");
                    this.$data.showYouTubeAsLink = MGGApi.isSocialYouTubeValid(this.$data.userDetail.socialYouTube);
                    this.$data.showTwitterAsLink = MGGApi.isSocialTwitterURLValid(this.$data.userDetail.socialTwitter);
                    this.$data.showTwitterAsAtLink = MGGApi.isSocialTwitterAtValid(this.$data.userDetail.socialTwitter);

                    if(this.$data.userDetail.banActive) {
                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "account-circle",
                            text: this.$t('userDetail.snackbar.banned'),
                            stay: true,
                        });
                        this.$data.userDetail = null;
                    }
                } catch(error) {
                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "account-circle",
                                text: this.$t('userDetail.snackbar.notFound'),
                                stay: true,
                            });
                            break;
                        case "UserNotFoundException":
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "account-circle",
                                text: this.$t('userDetail.snackbar.notFound'),
                                stay: true,
                            });
                            break;
                    }

                    console.error(error);
                    this.$data.apiLoading = false;
                }
            },
        }
    }
</script>


<style lang="less" scoped>
    .user-loading {
        padding: 150px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .user-bar {
        background: url('../../assets/img/patternLight.png') center rgba(0,0,0,0.07);
        height: 140px;
    }
    & .page-thirdssplit {
        display: grid;
        grid-template-columns: minmax(350px, 1fr) 2fr;
        grid-gap: 25px;
        padding: 50px 0px;
        align-items: flex-start;
    }
    .user-basic {
        display: grid;
        grid-gap: 15px;

        & .avatar {
            background-position: center;
            background-size: cover;
            width: 150px;
            height: 150px;
            border-radius: 200px;
            margin-top: -120px;
            justify-self: center;
        }
        & .username {
            font-size: 22px;
            font-weight: bold;
            justify-self: center;
        }
    }
    .user-meta {
        display: grid;
        grid-gap: 15px;

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
                & div:nth-child(2) {
                    word-wrap: break-word;
                    overflow: hidden;

                    & a {
                        color: #25b9ff;
                    }
                }
            }
        }
        & .team-banner {
            background: #ff8144;
            padding: 15px;
            border-radius: 5px;
            color: #fff;
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 15px;
            align-items: center;

            & .mdi {
                font-size: 24px;
            }
        }
        & .actions {
            display: grid;
            grid-gap: 10px;
            text-align: center;
        }
    }
    .user-games {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 25px;
    }
    .user-nogames {
        padding: 25px 50px;
        text-align: center;
        background: rgba(0,0,0,0.07);
        opacity: 0.5;
        border-radius: 5px;
    }

    .theme-dark {
        & .user-bar {
            background: url('../../assets/img/patternDark.png') center rgba(255,255,255,0.07);
        }
        & .user-nogames {
            background: rgba(255,255,255,0.07);
        }
    }

    @media screen and (max-width: 1300px) {
        .page-thirdssplit {
            grid-template-columns: 1fr;
        }
    }

    @media screen and (max-width: 800px) {
        .user-games {
            grid-template-columns: 1fr;
        }
    }
</style>