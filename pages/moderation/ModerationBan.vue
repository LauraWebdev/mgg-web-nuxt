<template>
    <div class="page-centered page-moderation-ban">
        <div class="loading" v-if="apiLoading || userDetail == null">
            <LoadingCircle />
        </div>
        <div class="page-wrapper user-detail" v-if="!apiLoading && userDetail != null">
            <div class="user-meta">
                <div class="avatar" :style="`background-image: url('${ userDetail.avatarFileName }')`"></div>
                <div class="meta-info">
                    <div class="item">
                        <div class="property">{{ $t('userEdit.form.username') }}</div>
                        <div class="content">{{ userDetail.username }}</div>
                    </div>
                    <div class="item" v-if="userDetail.pronouns != '' && userDetail.pronouns != undefined">
                        <div class="property">{{ $t('userDetail.meta.pronouns') }}</div>
                        <div class="content">{{ userDetail.pronouns }}</div>
                    </div>
                    <div class="item" v-if="userDetail.ingameID != '' && userDetail.ingameID != undefined">
                        <div class="property">{{ $t('userDetail.meta.ingameID') }}</div>
                        <div class="content">{{ userDetail.ingameID }}</div>
                    </div>
                    <div class="item">
                        <div class="property">{{ $t('userDetail.meta.joinedDate') }}</div>
                        <div class="content">{{ createdFormatted }}</div>
                    </div>
                </div>
                <div class="meta-info">
                    <div class="item">
                        <div class="property">Ban Status</div>
                        <div class="content">{{ userDetail.banActive ? 'Banned' : 'Unbanned' }}</div>
                    </div>
                    <div class="item" v-if="userDetail.banActive">
                        <div class="property">Ban Reason</div>
                        <div class="content">{{ userDetail.banReason }}</div>
                    </div>
                </div>
                <div class="meta-info" v-if="userDetail.socialDiscord != null && userDetail.socialDiscord != '' || userDetail.socialTwitter != null && userDetail.socialTwitter != '' || userDetail.socialYouTube != null && userDetail.socialYouTube != ''">
                    <div class="item" v-if="userDetail.socialDiscord != null && userDetail.socialDiscord != ''">
                        <div class="property">Discord</div>
                        <div class="content">{{ userDetail.socialDiscord }}</div>
                    </div>
                    <div class="item" v-if="userDetail.socialTwitter != null && userDetail.socialTwitter != ''">
                        <div class="property">Twitter</div>
                        <div class="content">{{ userDetail.socialTwitter }}</div>
                    </div>
                    <div class="item" v-if="userDetail.socialYouTube != null && userDetail.socialYouTube != ''">
                        <div class="property">YouTube</div>
                        <div class="content">{{ userDetail.socialYouTube }}</div>
                    </div>
                </div>
            </div>
            <div class="actions">
                <div class="unban" v-if="userDetail.banActive">
                    <p>This user is currently banned. After consulting the team, click this button to unban this user.</p>
                    <button class="button button-filled" v-on:click="unbanUser()">Unban</button>
                </div>
                <div class="ban" v-if="!userDetail.banActive">
                    <p>This user is currently not banned. Please provide a reason for banning this user. This reason will be visible to the public (and the user upon login).</p>
                    <textarea class="input" v-model="banReason"></textarea>
                    <button class="button button-filled" v-on:click="banUser()">Ban</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '../../modules/api';

    import LoadingCircle from '@/components/General/LoadingCircle';

    export default {
        name: 'ModerationBan',
        metaInfo: {
            title: 'Banning/Unbanning Users',
        },
        data: function() {
            return {
                apiRef: null,
                apiLoading: true,
                userDetail: null,
                createdFormatted: "",
                banReason: "",
            }
        },
        components: {
            LoadingCircle,
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

                    this.$data.createdFormatted = new Date(Date.parse(this.$data.userDetail.createdAt)).toLocaleDateString("en-US");
                } catch(error) {
                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "account-circle",
                                text: this.$t('userDetail.snackbar.serverError'),
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
                    
                    this.$data.apiLoading = false;
                }
            },
            banUser: async function() {
                this.$data.apiLoading = true;

                try {
                    await this.$data.apiRef.banUser(this.$data.userDetail.id, this.$data.banReason, this.$store.state.userToken);

                    this.loadUser();

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "content-save-outline",
                        text: "User was successfully banned.",
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
                                text: "Couldn't ban user due to a server error.",
                                stay: true,
                            });
                            return;
                        case "UserNotFoundException":
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "content-save-outline",
                                text: "This user does not exist anymore.",
                                stay: false,
                            });
                            return;
                    }
                }
            },
            unbanUser: async function() {
                this.$data.apiLoading = true;

                try {
                    await this.$data.apiRef.unbanUser(this.$data.userDetail.id, this.$store.state.userToken);

                    this.loadUser();

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "content-save-outline",
                        text: "User was successfully unbanned.",
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
                                text: "Couldn't ban user due to a server error.",
                                stay: true,
                            });
                            return;
                        case "UserNotFoundException":
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "content-save-outline",
                                text: "This user does not exist anymore.",
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
    .loading {
        padding: 150px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .user-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: flex-start;
        grid-gap: 25px;

        & .user-meta {
            display: grid;
            grid-gap: 15px;

            & .avatar {
                background-position: center;
                background-size: cover;
                width: 150px;
                height: 150px;
                border-radius: 200px;
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
                    & div:nth-child(2) {
                        word-wrap: break-word;
                        overflow: hidden;
                    }
                }
            }
        }

        & .unban {
            background: rgba(0,0,0,0.07);
            padding: 25px;
            border-radius: 5px;

            & p {
                margin: 0;
                margin-bottom: 15px;
            }
        }

        & .ban {
            background: rgba(0,0,0,0.07);
            padding: 25px;
            border-radius: 5px;
            display: grid;
            grid-template-rows: auto 100px auto;
            grid-gap: 25px;

            & p {
                margin: 0;
            }

            & .button {
                justify-self: flex-end;
            }
        }
    }

    .theme-dark {
        & .user-detail {
            & .unban {
                background: rgba(255,255,255,0.1);
            }

            & .ban {
                background: rgba(255,255,255,0.1);
            }
        }
    }
</style>