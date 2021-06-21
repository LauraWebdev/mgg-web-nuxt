<template>
    <div class="page-centered page-logout">
        <div class="logout-box">
            <div class="box-header">{{ $t('logout.header') }}</div>
            <div class="box-content" v-html="$t('logout.text')"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Logout',
        metaInfo: {
            title: 'See you soon!',
        },
        mounted: function() {
            this.logout();
        },
        methods: {
            logout: function() {

                this.$root.$emit('addSnackbar', {
                    type: "success",
                    icon: "key",
                    text: this.$t('logout.snackbar.successful'),
                    stay: false,
                });

                this.$store.dispatch('refreshUser', {
                    userData: null,
                    userRoles: null,
                    userToken: null
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-logout {
        background: url('../../assets/img/patternLight.png') center #ddd;

        & .logout-box {
            background: #fff;
            color: #222;
            border: 2px solid #222;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            overflow: hidden;
            margin: 25px 0px;

            & .box-header {
                background: #222;
                color: #fff;
                padding: 10px 15px;
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.15em;
            }
            & .box-content {
                padding: 20px;
                display: grid;
                grid-gap: 15px;
                text-align: center;
                line-height: 1.5em;
            }
        }
    }

    .theme-dark {
        & .page-logout {
            background: url('../../assets/img/patternDark.png') center rgba(255,255,255,0.07);

            & .logout-box {
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