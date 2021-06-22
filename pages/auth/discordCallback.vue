<template>
    <div class="page-centered page-login">
        <div class="login-box">
            <div class="box-header">{{ $t('oauthDiscordCallback.header') }}</div>
            <div class="box-content">
                <LoadingCircle />
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import LoadingCircle from '@/components/General/LoadingCircle';

    export default {
        components: {
            LoadingCircle,
        },
        data: function () {
            return {
                apiRef: null,
            };
        },
        created: function () {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function () {
            if (this.$router.currentRoute.query.code === undefined) {
                this.$root.$emit('addSnackbar', {
                    type: 'error',
                    icon: 'key',
                    text: this.$t('login.snackbar.error.serverError'),
                    stay: true,
                });

                this.$router.push({ name: 'auth-login' });
            } else {
                this.processDiscord();
            }
        },
        methods: {
            processDiscord: async function () {
                try {
                    const loginResponse = await this.$data.apiRef.oauthDiscordCallback(window.location);

                    this.$store.dispatch('refreshUser', loginResponse);

                    this.$root.$emit('addSnackbar', {
                        type: 'success',
                        icon: 'key',
                        text: this.$t('login.snackbar.welcomeBack', { username: loginResponse.userData.username }),
                        stay: false,
                    });

                    this.$router.push({ name: 'discovery-index' });
                } catch (error) {
                    switch (error.name) {
                        default:
                            this.$root.$emit('addSnackbar', {
                                type: 'error',
                                icon: 'key',
                                text: this.$t('login.snackbar.error.serverError'),
                                stay: false,
                            });
                            break;
                    }

                    this.$router.push({ name: 'auth-login' });
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .page-login {
        background: url('../../assets/img/patternLight.png') center #ffd332;

        & .login-box {
            background: #fff;
            border: 2px solid #222;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            overflow: hidden;
            margin: 25px 0px;

            & .box-header {
                background: #222;
                padding: 10px 15px;
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.15em;
            }
            & .box-content {
                padding: 20px;
                display: grid;
                grid-gap: 15px;
                justify-content: center;
                padding: 50px 20px;
            }
        }
    }

    .theme-dark {
        & .page-login {
            background: url('../../assets/img/patternDark.png') center #322700;

            & .login-box {
                background: #222;
                color: #fff;
                border: 2px solid #fff;

                & .box-header {
                    background: #fff;
                    color: #222;
                }
            }
        }
    }
</style>
