<template>
    <div class="page-gameedit">
        <div class="page-centered page-header">
            <div class="page-wrapper">
                <h1>{{ $t('gameEdit.header') }}</h1>
                <p>{{ $t('gameEdit.explaination') }}</p>
            </div>
        </div>

        <div class="page-centered page-deleteLoading" v-if="apiLoading || gameDetail == null">
            <div class="page-wrapper">
                <LoadingCircle />
            </div>
        </div>
        <div class="page-centered" v-if="!apiLoading && gameDetail != null">
            <div class="page-wrapper">
                <div class="tabs">
                    <div class="tab" :class="currentTab == 0 ? 'active' : ''" v-on:click="changeTab(0)">{{ $t('gameAdd.general.header') }}</div>
                    <div class="tab" :class="currentTab == 1 ? 'active' : ''" v-on:click="changeTab(1)">{{ $t('gameAdd.discoverability.header') }}</div>
                    <div class="tab" :class="currentTab == 2 ? 'active' : ''" v-on:click="changeTab(2)">{{ $t('gameAdd.media.header') }}</div>
                    <div class="tab" :class="currentTab == 3 ? 'active' : ''" v-on:click="changeTab(3)">{{ $t('gameEdit.screenshots.header') }}</div>
                </div>
            </div>
        </div>

        <div class="page-centered page-editForm" v-if="!apiLoading">
            <div class="page-wrapper">
                <div class="step" v-if="currentTab == 0">
                    <div class="step-input">
                        <label>{{ $t('gameAdd.general.form.title') }}*</label>
                        <input type="text" class="input" v-model="tab0Title" :placeholder="$t('gameAdd.general.form.titlePlaceholder')" />
                    </div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.general.form.description') }}</label>
                        <textarea rows="4" class="input" v-model="tab0Description"></textarea>
                    </div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.general.form.ingameID') }}*</label>
                        <input type="text" class="input" v-model="tab0IngameID" :placeholder="$t('gameAdd.general.form.ingameIDPlaceholder')" />
                    </div>
                </div>

                <div class="step" v-if="currentTab == 1">
                    <div class="step-input">
                        <label>{{ $t('gameAdd.discoverability.form.displayStatus') }}</label>
                        <select class="input-select" v-model="tab1DisplayStatus">
                            <option value="0">{{ $t('gameAdd.discoverability.form.displayStatus0') }}</option>
                            <option value="1">{{ $t('gameAdd.discoverability.form.displayStatus1') }}</option>
                            <option value="2">{{ $t('gameAdd.discoverability.form.displayStatus2') }}</option>
                        </select>
                    </div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.discoverability.form.channels') }}</label>
                        <select class="input-select" multiple v-model="tab1Channels">
                            <option v-for="channel in tab1AllChannels" v-bind:key="channel.id" :value="channel.id">{{ channel.title }}</option>
                        </select>
                    </div>
                </div>

                <div class="step" v-if="currentTab == 2">
                    <div class="step-input">
                        <label>{{ $t('gameAdd.media.form.coverFile') }}</label>
                        <div class="cover-holder">
                            <div class="change-cover" v-on:click="$refs.coverFile.click()" :style="`background-image: url('${gameDetail.coverFileName}')`">
                                <div class="icon">
                                    <span class="mdi mdi-image-edit"></span>
                                    <div class="hint">{{ $t('gameEdit.media.form.fileHint') }}</div>
                                </div>
                                <input type="file" ref="coverFile" v-on:change="processCoverFile" accept="png,jpg" />
                            </div>

                            <div class="button" v-on:click="deleteCover()">{{ $t('gameEdit.media.form.deleteCoverButton') }}</div>
                        </div>
                    </div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.media.form.youtubeUrl') }}</label>
                        <input type="text" class="input" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" v-model="tab2VideoURL" />
                    </div>
                </div>

                <div class="screenshots" v-if="currentTab == 3">
                    <div class="screenshot"
                        v-for="screenshot in gameDetail.screenshots"
                        v-bind:key="screenshot.id"
                        :style="`background-image: url('${screenshot.fileName}')`"
                        v-on:click="deleteScreenshot(screenshot.id)">
                        <div class="icon">
                            <span class="mdi mdi-image-remove"></span>
                        </div>
                    </div>
                    <div class="add-screenshot" v-on:click="$refs.screenshotFiles.click()">
                        <div class="icon">
                            <span class="mdi mdi-image-plus"></span>
                            <div class="hint">{{ $t('gameEdit.media.form.fileHint') }}</div>
                        </div>
                        <input type="file" ref="screenshotFiles" v-on:change="processScreenshotFiles" multiple accept="png,jpg" />
                    </div>
                </div>

                <div class="step-actions" v-if="currentTab != 3">
                    <div class="footnote">{{ $t('gameAdd.requiredNotice') }}</div>
                    <LinkButton :to="{ name: 'GameDetail', params: { id: gameDetail.id }}">{{ $t('gameEdit.backToGamePageButton') }}</LinkButton>
                    <button class="button button-filled" v-on:click="saveGame()">{{ $t('gameEdit.saveButton') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import LoadingCircle from '@/components/General/LoadingCircle';
    import LinkButton from '@/components/General/LinkButton';

    export default {
        name: 'GameEdit',
        metaInfo: {
            title: 'Editing a game',
        },
        data: function() {
            return {
                apiRef: null,
                apiLoading: true,
                apiError: false,
                gameDetail: null,
                currentTab: 0,
                tab0Title: "",
                tab0Description: "",
                tab0IngameID: "",
                tab1DisplayStatus: 0,
                tab1Channels: [],
                tab1AllChannels: [],
                tab2CoverFile: "",
                tab2VideoURL: "",
                tab3ScreenshotFiles: [],
            }
        },
        components: {
            LoadingCircle,
            LinkButton
        },
        created: function() {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function() {
            this.loadGame();
            this.fetchChannels();
        },
        methods: {
            loadGame: async function() {
                this.$data.apiLoading = true;

                try {
                    let gameResponse = await this.$data.apiRef.getGameDetail(this.$router.currentRoute.params.id, this.$store.state.userToken);
                    this.$data.gameDetail = gameResponse.game;

                    if(this.$data.gameDetail.user.id != this.$store.state.userData.id && !['moderator', 'admin'].some(str => this.$store.state.userRoles.includes(str))) {
                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "lock-off-outline",
                            text: this.$t('gameEdit.snackbar.error.notAllowed'),
                            stay: true,
                        });
                        return;
                    }

                    this.$data.tab0Title = this.$data.gameDetail.title;
                    this.$data.tab0Description = this.$data.gameDetail.description;
                    this.$data.tab0IngameID = this.$data.gameDetail.ingameID;

                    this.$data.tab1DisplayStatus = this.$data.gameDetail.displayStatus;
                    this.$data.tab1Channels = [];
                    this.$data.gameDetail.channels.forEach(channel => {
                        this.$data.tab1Channels.push(channel.id);
                    });

                    this.$data.tab2VideoURL = this.$data.gameDetail.youtubeID != '' ? `https://youtube.com/watch?v=${this.$data.gameDetail.youtubeID}` : '';

                    this.$data.apiLoading = false;
                } catch(error) {
                    switch(error.name) {
                        default:
                            console.error(error);
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "gamepad-square",
                                text: this.$t('gameEdit.snackbar.error.loadServerError'),
                                stay: true,
                            });
                            break;
                        case "GameNotFoundException":
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "gamepad-square",
                                text: this.$t('gameEdit.snackbar.error.loadNotFound'),
                                stay: true,
                            });
                            break;
                        case "GamePrivateException":
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "gamepad-square",
                                text: this.$t('gameEdit.snackbar.error.loadPrivate'),
                                stay: true,
                            });
                            break;
                    }

                    this.$data.apiLoading = false;
                }
            },
            processCoverFile: function(event) {
                this.$data.tab2CoverFile = event.target.files[0];

                this.updateCover();
            },
            processScreenshotFiles: function(event) {
                this.$data.tab3ScreenshotFiles = event.target.files;

                this.uploadScreenshots();
            },
            fetchChannels: async function() {
                try {
                    this.$data.tab1AllChannels = await this.$data.apiRef.getAllChannels();
                } catch(error) {
                    console.error(error);
                }
            },
            changeTab: function(tabIndex) {
                this.$data.currentTab = tabIndex;
            },
            deleteScreenshot: async function(screenshotID) {
                this.$data.apiLoading = true;

                try {
                    await this.$data.apiRef.deleteGameScreenshot(screenshotID, this.$store.state.userToken);
                    this.loadGame();

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "trash-can-outline",
                        text: this.$t('gameEdit.snackbar.success.screenshotDeleted'),
                        stay: false,
                    });
                } catch(error) {
                    console.error(error);
                    this.$data.apiLoading = false;

                    this.$root.$emit('addSnackbar', {
                        type: "error",
                        icon: "trash-can-outline",
                        text: this.$t('gameEdit.snackbar.error.screenshotDeleted'),
                        stay: false,
                    });
                }
            },
            updateCover: async function() {
                if(this.$data.tab2CoverFile == undefined) return;

                this.$data.apiLoading = true;

                try {
                    await this.$data.apiRef.updateGameCover(this.$data.gameDetail.id, this.$data.tab2CoverFile, this.$store.state.userToken);

                    this.$data.apiLoading = false;
                    this.loadGame();

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "content-save-outline",
                        text: this.$t('gameEdit.snackbar.success.coverUpdated'),
                        stay: false,
                    });
                } catch(error) {
                    console.error(error);
                    this.$data.apiLoading = false;

                    if(error.name == "FileWrongFormatException") {
                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "content-save-outline",
                            text: this.$t('gameEdit.snackbar.success.coverWrongFormat'),
                            stay: true,
                        });
                    } else {
                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "content-save-outline",
                            text: this.$t('gameEdit.snackbar.success.coverServerError'),
                            stay: false,
                        });
                    }
                }
            },
            deleteCover: async function() {
                this.$data.apiLoading = true;

                try {
                    await this.$data.apiRef.deleteGameCover(this.$data.gameDetail.id, this.$store.state.userToken);

                    this.$data.apiLoading = false;
                    this.loadGame();

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "content-save-outline",
                        text: this.$t('gameEdit.snackbar.success.coverDeleted'),
                        stay: false,
                    });
                } catch(error) {
                    console.error(error);
                    this.$data.apiLoading = false;

                    this.$root.$emit('addSnackbar', {
                        type: "error",
                        icon: "trash-can-outline",
                        text: this.$t('gameEdit.snackbar.error.coverDeleteServerError'),
                        stay: false,
                    });
                }
            },
            uploadScreenshots: async function() {
                if(this.$data.tab3ScreenshotFiles == undefined) return;

                this.$data.apiLoading = true;

                try {
                    await this.$data.apiRef.uploadGameScreenshots(this.$data.gameDetail.id, this.$data.tab3ScreenshotFiles, this.$store.state.userToken);

                    this.$data.apiLoading = false;
                    this.loadGame();

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "content-save-outline",
                        text: this.$t('gameEdit.snackbar.success.screenshotUploaded'),
                        stay: false,
                    });
                } catch(error) {
                    console.error(error);
                    this.$data.apiLoading = false;

                    if(error.name == "FileWrongFormatException") {
                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "content-save-outline",
                            text: this.$t('gameEdit.snackbar.error.screenshotWrongFormat'),
                            stay: true,
                        });
                    } else {
                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "content-save-outline",
                            text: this.$t('gameEdit.snackbar.error.screenshotUploadServerError'),
                            stay: true,
                        });
                    }
                }
            },
            saveGame: async function() {
                this.$data.apiLoading = true;

                try {
                    let gamePayload = {
                        title: this.$data.tab0Title,
                        description: this.$data.tab0Description,
                        ingameID: this.$data.tab0IngameID,
                        displayStatus: this.$data.tab1DisplayStatus,
                        channels: this.$data.tab1Channels,
                        youtubeID: this.$data.tab2VideoURL,
                    }

                    if(gamePayload.title == "" || gamePayload.ingameID == "") {
                        this.$data.apiLoading = false;
                        this.loadGame();

                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "content-save-outline",
                            text: this.$t('gameEdit.snackbar.error.requiredEmpty'),
                            stay: false,
                        });
                        return;
                    }

                    await this.$data.apiRef.updateGame(this.$data.gameDetail.id, gamePayload, this.$store.state.userToken);

                    this.$data.apiLoading = false;
                    this.loadGame();

                    this.$root.$emit('addSnackbar', {
                        type: "success",
                        icon: "content-save-outline",
                        text: this.$t('gameEdit.snackbar.success.saved'),
                        stay: false,
                    });
                } catch(error) {
                    console.error(error);
                    this.$data.apiLoading = false;

                    if(error.name == "IngameIDWrongFormatException") {
                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "content-save-outline",
                            text: this.$t('gameEdit.snackbar.error.gameIDInvalid'),
                            stay: true,
                        });
                    } else {
                        this.$root.$emit('addSnackbar', {
                            type: "error",
                            icon: "content-save-outline",
                            text: this.$t('gameEdit.snackbar.error.screenshotUploadServerError'),
                            stay: true,
                        });
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-deleteLoading {
        margin: 100px 0px;

        & .page-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .page-editForm {
        margin-bottom: 50px;

        & .screenshots {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 25px;

            & .screenshot, & .add-screenshot {
                width: 100%;
                padding-top: 56.25%;
                background-position: center;
                background-size: cover;
                border-radius: 5px;
                position: relative;
                overflow: hidden;

                & .icon {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;

                    & .mdi {
                        font-size: 32px;
                        margin-bottom: 5px;
                    }
                }
            }

            & .screenshot {
                & .icon {
                    background: rgba(0,0,0,0.6);
                    color: #fff;
                    opacity: 0;
                    transition: 0.2s ease-in-out opacity;

                    &:hover {
                        opacity: 1;
                        cursor: pointer;
                    }
                }
            }
            & .add-screenshot {
                background: #25baff44;
                color: #1EA0DE;
                transition: 0.2s ease-in-out color, 0.2s ease-in-out background;

                &:hover {
                    background: #1EA0DE;
                    color: #fff;
                    cursor: pointer;
                }

                & input {
                    display: none;
                }
            }
        }

        & .step {
            display: grid;
            grid-gap: 25px;

            & .step-title {
                font-size: 24px;
                font-weight: bold;
            }
            & .step-text {
                line-height: 1.5em;
            }
            & .step-input {
                display: grid;
                grid-gap: 5px;
            }
            & .cover-holder {
                max-width: 250px;
                width: 100%;
                display: grid;
                grid-gap: 10px;

                & .change-cover {
                    width: 100%;
                    padding-top: 56.25%;
                    background-position: center;
                    background-size: cover;
                    border-radius: 5px;
                    position: relative;
                    overflow: hidden;

                    & .icon {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        background: rgba(0,0,0,0.6);
                        color: #fff;
                        opacity: 0;
                        transition: 0.2s ease-in-out opacity;

                        & .mdi {
                            font-size: 32px;
                            margin-bottom: 5px;
                        }

                        &:hover {
                            opacity: 1;
                            cursor: pointer;
                        }
                    }

                    & input {
                        display: none;
                    }
                }
                & .button {
                    text-align: center;
                }
            }
            & .step-loading {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 50px 0px;
            }
        }

        & .step-actions {
            display: grid;
            grid-template-columns: 1fr auto auto;
            grid-gap: 15px;
            margin-top: 25px;
            align-items: center;
            
            & .footnote {
                font-size: 14px;
                opacity: 0.6;
            }
        }
    }

    @media screen and (max-width: 1300px) {
        .page-editForm {
            & .screenshots {
                grid-template-columns: 1fr 1fr 1fr;
            }
        }
    }

    @media screen and (max-width: 800px) {
        .page-editForm {
            & .screenshots {
                grid-template-columns: 1fr 1fr;
            }
        }
    }
</style>