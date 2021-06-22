<template>
    <div class="page-centered page-register">
        <div class="register-box">
            <div class="box-header">{{ $t('register.header') }}</div>
            <form class="box-content" v-on:submit.prevent="register()">
                <input class="input" type="text" v-model="userName" :placeholder="$t('register.form.usernamePlaceholder')" />
                <span>{{ $t('register.form.usernameRequirements') }}</span>
                <input class="input" type="password" v-model="userPass" :placeholder="$t('register.form.passwordPlaceholder')" />
                <input class="input" type="password" v-model="userPass2" :placeholder="$t('register.form.passwordAgainPlaceholder')" />
                <input class="input" type="email" v-model="userMail" :placeholder="$t('register.form.emailPlaceholder')" />

                <button v-on:click="register()" class="button button-filled">{{ $t('register.form.registerButton') }}</button>

                <div class="social-logins">
                    <button v-on:click="loginDiscord()" class="button">Discord</button>
                    <!-- <button v-on:click="loginDiscord()" class="button">Twitter</button>
                    <button v-on:click="loginDiscord()" class="button">Google</button> -->
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    export default {
        meta: {
            title: 'Create a new account',
        },
        data: function () {
            return {
                apiRef: null,
                apiLoading: false,
                userName: '',
                userPass: '',
                userPass2: '',
                userMail: '',
            };
        },
        created: function () {
            this.$data.apiRef = new MGGApi();
        },
        methods: {
            register: async function () {
                if (this.$data.apiLoading) { return; }

                if (this.$data.userName === '' || this.$data.userPass === '' || this.$data.userPass2 === '' || this.$data.userMail === '') {
                    this.$root.$emit('addSnackbar', {
                        type: 'error',
                        icon: 'key',
                        text: this.$t('login.snackbar.error.fillOut'),
                        stay: false,
                    });
                    return;
                }

                if (!this.$data.userMail.includes('@')) {
                    this.$root.$emit('addSnackbar', {
                        type: 'error',
                        icon: 'key',
                        text: this.$t('login.snackbar.error.emailInvalid'),
                        stay: false,
                    });
                    return;
                }

                if (this.$data.userPass !== this.$data.userPass2) {
                    this.$root.$emit('addSnackbar', {
                        type: 'error',
                        icon: 'key',
                        text: this.$t('login.snackbar.error.passwordNotEqual'),
                        stay: false,
                    });
                    return;
                }

                this.$data.apiLoading = true;

                try {
                    await this.$data.apiRef.authRegister(this.$data.userName, this.$data.userPass, this.$data.userMail);

                    this.$data.apiLoading = false;

                    this.$root.$emit('addSnackbar', {
                        type: 'success',
                        icon: 'key',
                        text: this.$t('register.snackbar.success'),
                        stay: false,
                    });
                    this.$router.push({ name: 'auth-login' });
                } catch (error) {
                    this.$data.apiLoading = false;

                    switch (error.name) {
                        case 'UsernameInvalidException':
                            this.$root.$emit('addSnackbar', {
                                type: 'error',
                                icon: 'key',
                                text: this.$t('userEdit.snackbar.error.usernameForbidden'),
                                stay: false,
                            });
                            break;
                        case 'UsernameEmailConflictException':
                            this.$root.$emit('addSnackbar', {
                                type: 'error',
                                icon: 'key',
                                text: this.$t('login.snackbar.error.inUse'),
                                stay: false,
                            });
                            break;
                        default:
                            this.$root.$emit('addSnackbar', {
                                type: 'error',
                                icon: 'key',
                                text: this.$t('login.snackbar.error.registerServerError'),
                                stay: false,
                            });
                            break;
                    }
                }
            },
            loginDiscord: async function () {
                const oauthUrl = await this.$data.apiRef.oauthDiscordGetUrl();

                window.location = oauthUrl.url;
            }
        }
    };
</script>

<style lang="less" scoped>
    .page-register {
        background: url('../../assets/img/patternLight.png') center #ffd332;

        & .register-box {
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

                & button {
                    justify-self: right;
                }

                & .social-logins {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-gap: 15px;
                    margin-top: 15px;

                    & button {
                        justify-self: stretch;
                    }
                }
            }

            & span {
                margin-top: -8px;
                margin-bottom: 8px;
                font-size: 10px;
            }
        }
    }

    .theme-dark {
        & .page-register {
            background: url('../../assets/img/patternDark.png') center #322700;

            & .register-box {
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
