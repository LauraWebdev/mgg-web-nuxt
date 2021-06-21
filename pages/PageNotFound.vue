<template>
    <div class="page page-centered">
        <div class="body">
            <div class="number">404</div>
            <div class="text">Sorry, we couldn't find the page<br />you were looking for!</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageNotFound',
        metaInfo: {
            title: 'Page not found',
        },
        components: {
        }
    }
</script>

<style lang="less" scoped>
    .body {
        text-align: center;

        & .number {
            font-size: 100px;
            font-weight: bold;
        }
        & .text {
            font-size: 16px;
            opacity: 0.6;
        }
    }
</style>
