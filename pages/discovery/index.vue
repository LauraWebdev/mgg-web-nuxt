<template>
    <div class="page-centered">
        <div class="page-wrapper page-index">
            <div class="support">
                <span class="mdi mdi-hand-heart"></span>
                <div class="text" v-html="$t('index.support')"></div>
                <div class="actions">
                    <ExternalLinkButton href="https://paypal.me/pools/c/8Ad2xnFEH4">PayPal Moneypool</ExternalLinkButton>
                    <ExternalLinkButton href="https://indiegesindel.itch.io/">Itch.io Games</ExternalLinkButton>
                </div>
            </div>

            <div class="welcome">
                <span class="mdi mdi-bug"></span>
                <div class="text" v-html="$t('index.welcome')"></div>
                <div class="actions">
                    <ExternalLinkButton href="https://mygarage.games/discord">Indiegesindel Discord</ExternalLinkButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ExternalLinkButton from '@/components/General/ExternalLinkButton';

    export default {
        name: 'Index',
        meta: {
            title: 'Discover & Share',
        },
        components: {
            ExternalLinkButton,
        }
    }
</script>

<style lang="less" scoped>
    .page-index {
        display: grid;
        grid-gap: 50px;
        align-content: flex-start;

        & .support, & .welcome {
            background: #25b9ff44;
            padding: 25px;
            border-radius: 5px;
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 10px 25px;

            & .mdi {
                color: #25b9ff;
                font-size: 24px;
            }
            & .text {
                line-height: 1.5em;
                opacity: 0.6;
            }
            & .actions {
                grid-column: 2;

                & a {
                    margin-right: 10px;
                }
            }
        }

        & .welcome {
            background: #00d19844;

            & .mdi {
                color: #00d198;
            }
        }
    }

    .theme-dark {
        & .support, & .welcome {
            & .actions {
                & a {
                    color: #fff;
                    border-color: rgba(255,255,255,0.4);
                }
            }
        }
    }
</style>
