<template>
    <div class="page-gameadd">
        <div class="page-centered page-header">
            <div class="page-wrapper">
                <h1>{{ $t('gameAdd.header') }}</h1>
                <p v-html="$t('gameAdd.explaination')"></p>
            </div>
        </div>

        <div class="page-centered page-addGameForm">
            <div class="page-wrapper">
                <div class="step" v-if="currentStep == 0">
                    <div class="step-title">{{ $t('gameAdd.rules.header') }}</div>
                    <div class="step-text">
                        <span v-html="$t('gameAdd.rules.maynot')"></span>
                        <ul>
                            <li>{{ $t('gameAdd.rules.ruleHateful') }}</li>
                            <li>{{ $t('gameAdd.rules.ruleIP') }}</li>
                            <li>{{ $t('gameAdd.rules.ruleExplicit') }}</li>
                        </ul>
                    </div>
                    <div class="step-text">
                        {{ $t('gameAdd.rules.ruleLowEffort') }}
                    </div>
                    <div class="step-text">
                        {{ $t('gameAdd.rules.ruleContentNotice') }}
                    </div>
                    <div class="step-text">
                        {{ $t('gameAdd.rules.ruleModeration') }}
                    </div>
                    <div class="step-text">
                        {{ $t('gameAdd.rules.ruleDiscretion') }}
                    </div>
                </div>
                <div class="step" v-if="currentStep == 1">
                    <div class="step-title">{{ $t('gameAdd.general.header') }}</div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.general.form.title') }}*</label>
                        <input type="text" class="input" v-model="step0Title" :placeholder="$t('gameAdd.general.form.titlePlaceholder')" />
                    </div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.general.form.description') }}</label>
                        <textarea rows="4" class="input" v-model="step0Description"></textarea>
                    </div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.general.form.ingameID') }}*</label>
                        <input type="text" class="input" v-model="step0IngameID" :placeholder="$t('gameAdd.general.form.ingameIDPlaceholder')" />
                    </div>
                </div>
                <div class="step" v-if="currentStep == 2">
                    <div class="step-title">{{ $t('gameAdd.discoverability.header') }}</div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.discoverability.form.displayStatus') }}</label>
                        <select class="input-select" v-model="step1DisplayStatus">
                            <option value="0">{{ $t('gameAdd.discoverability.form.displayStatus0') }}</option>
                            <option value="1">{{ $t('gameAdd.discoverability.form.displayStatus1') }}</option>
                            <option value="2">{{ $t('gameAdd.discoverability.form.displayStatus2') }}</option>
                        </select>
                    </div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.discoverability.form.channels') }}</label>
                        <select class="input-select" multiple v-model="step1Channels">
                            <option v-for="channel in step1AllChannels" v-bind:key="channel.id" :value="channel.id">{{ channel.title }}</option>
                        </select>
                    </div>
                </div>
                <div class="step" v-if="currentStep == 3">
                    <div class="step-title">{{ $t('gameAdd.media.header') }}</div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.media.form.coverFile') }}</label>
                        <input type="file" v-on:change="processCoverFile" />
                    </div>
                    <div class="step-input">
                        <label>{{ $t('gameAdd.media.form.youtubeUrl') }}</label>
                        <input type="text" class="input" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" v-model="step2VideoURL" />
                    </div>
                </div>
                <div class="step" v-if="currentStep == 4">
                    <div class="step-title" v-if="!apiLoading && !apiError">{{ $t('gameAdd.done.success.header') }}</div>
                    <div class="step-text" v-if="!apiLoading && !apiError">
                        {{ $t('gameAdd.done.success.text') }}
                    </div>
                    <div class="step-text" v-if="!apiLoading && apiErrorCoverWrongFormat">
                        <strong>{{ $t('gameAdd.done.success.coverWrongFormat') }}</strong>
                    </div>
                    <div class="step-loading" v-if="apiLoading">
                        <LoadingCircle />
                    </div>
                </div>
                <div class="step" v-if="apiError">
                    <div class="step-title">{{ $t('gameAdd.done.error.header') }}</div>
                    <div class="step-text">
                        {{ $t('gameAdd.done.error.text') }}
                    </div>
                </div>
                <div class="step-actions">
                    <div class="footnote" v-if="currentStep != 0 && currentStep != 4">{{ $t('gameAdd.requiredNotice') }}</div>
                    <button class="button" v-on:click="stepBack()" v-if="currentStep != 0 && currentStep != 4">{{ $t('gameAdd.action.backButton') }}</button>
                    <button class="button button-filled" v-on:click="stepContinue()" v-if="currentStep != 4">{{ currentStep == 0 ? $t('gameAdd.action.agreeButton') : $t('gameAdd.action.continueButton') }}</button>

                    <div v-if="currentStep == 4 && !apiLoading && !apiError"></div>
                    <div v-if="currentStep == 4 && !apiLoading && !apiError"></div>
                    <LinkButton :to="{ name: 'GameDetail', params: { id: createdGame.id }}" filled v-if="currentStep == 4 && !apiLoading && !apiError">{{ $t('gameAdd.action.goToGameButton') }}</LinkButton>
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
        name: 'GameAdd',
        metaInfo: {
            title: 'Add a new game',
        },
        data: function() {
            return {
                apiRef: null,
                apiLoading: true,
                apiError: false,
                apiErrorCoverWrongFormat: false,
                currentStep: 0,
                step0Title: "",
                step0Description: "",
                step0IngameID: "",
                step1DisplayStatus: 0,
                step1AllChannels: [],
                step1Channels: [],
                step2CoverFile: "",
                step2VideoURL: "",
                createdGame: {id: 0},
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
            this.fetchChannels();
        },
        methods: {
            stepBack: function() {
                if(this.$data.currentStep == 0) return;

                this.$data.currentStep--;
            },
            stepContinue: async function() {
                if(this.validateInput(this.$data.currentStep)) {
                    this.$data.currentStep++;
                }

                if(this.$data.currentStep == 4) {
                    this.$data.apiLoading = true;
                    await this.createGame();
                }
            },
            validateInput: function() {
                switch(this.$data.currentStep) {
                    case 0:
                        return true;
                    case 1:
                        if(this.$data.step0Title == "" || this.$data.step0IngameID == "") {
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "plus",
                                text: this.$t('gameAdd.snackbar.fillOut'),
                                stay: false,
                            });
                            return false;
                        }

                        if(!MGGApi.isGameIDValid(this.$data.step0IngameID)) {
                            this.$root.$emit('addSnackbar', {
                                type: "error",
                                icon: "plus",
                                text: this.$t('gameAdd.snackbar.gameIDInvalid'),
                                stay: false,
                            });
                            return false;
                        }

                        return true;
                    case 2:
                        return true;
                    case 3:
                        return true;
                }
            },
            processCoverFile: function(event) {
                this.$data.step2CoverFile = event.target.files[0];
            },
            fetchChannels: async function() {
                try {
                    this.$data.step1AllChannels = await this.$data.apiRef.getAllChannels();
                } catch(error) {
                    console.error(error);
                }
            },
            createGame: async function() {
                    let gamePayload = {
                        title: this.$data.step0Title,
                        description: this.$data.step0Description,
                        ingameID: this.$data.step0IngameID,
                        displayStatus: this.$data.step1DisplayStatus,
                        channels: this.$data.step1Channels,
                        youtubeID: this.$data.step2VideoURL,
                    }

                    try {
                        let createdGame = await this.$data.apiRef.postGame(gamePayload, this.$store.state.userToken);
                        
                        if(this.$data.step2CoverFile != undefined && this.$data.step2CoverFile != "") {
                            try {
                                await this.$data.apiRef.updateGameCover(createdGame.id, this.$data.step2CoverFile, this.$store.state.userToken);
                            } catch(error) {
                                if(error.name == "FileWrongFormatException") {
                                    this.$data.apiErrorCoverWrongFormat = true;
                                }
                            }
                        }

                        this.$data.apiLoading = false;
                        this.$data.createdGame = createdGame;
                    } catch(error) {
                        console.error(error);

                        this.$data.apiLoading = false;
                        this.$data.apiError = true;
                    }
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-addGameForm {
        margin: 50px 0px;

        & .page-wrapper {
            max-width: 600px;
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
</style>