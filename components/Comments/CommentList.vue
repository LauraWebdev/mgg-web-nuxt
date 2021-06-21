<template>
    <div class="comment-list">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'CommentList',
    }
</script>

<style lang="less" scoped>
    & .comment-list {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 25px;
        align-self: flex-start;
    }
</style>