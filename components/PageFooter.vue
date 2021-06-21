<template>
    <footer>
        <p v-html="$t('footer.disclaimer')"></p>

        <LinkButton :to="{name: 'legal'}">{{ $t('footer.legalLink') }}</LinkButton>
        <ExternalLinkButton href="https://api.mygarage.games">{{ $t('footer.apiLink') }}</ExternalLinkButton>

        <br /><br />
    </footer>
</template>

<script>
    import LinkButton from '@/components/General/LinkButton';
    import ExternalLinkButton from '@/components/General/ExternalLinkButton';

    export default {
        name: 'PageFooter',
        components: {
            LinkButton,
            ExternalLinkButton
        }
    };
</script>

<style lang="less" scoped>
    footer {
        width: 90%;
        max-width: 1140px;
        margin: 50px auto;
        text-align: center;

        & p {
            background: rgba(0,0,0,0.07);
            border-radius: 4px;
            text-align: center;
            padding: 15px;
            margin: 0 0 15px 0;
            opacity: 0.6;
        }

        & a {
            margin: 0px 5px;
        }
    }

    .theme-dark {
        & footer {
            & p {
                background: rgba(255,255,255,0.07);
                opacity: 0.4;
            }
        }
    }
</style>
