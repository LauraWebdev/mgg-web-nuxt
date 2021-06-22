<template>
    <NuxtLink :to="{name: 'user-id', params: {id: id}}" class="avatar-item">
        <div class="avatar" :style="`background-image: url('${avatarFileName}');`"></div>
    </NuxtLink>
</template>

<script>
    export default {
        name: 'HeaderAvatarItem',
        props: {
            id: {
                type: Number,
                default: 0
            },
            avatarFileName: {
                type: String,
                default: ''
            },
            username: {
                type: String,
                default: ''
            }
        },
    };
</script>

<style lang="less" scoped>
    .avatar-item {
        display: flex;
        align-items: center;
        padding: 7px 2px;
        border: 3px solid transparent;
        display: block;
        margin-right: 5px;

        & .avatar {
            background-color: rgba(0,0,0,0.07);
            background-size: cover;
            background-position: center;
            width: 36px;
            height: 36px;
            border-radius: 50px;
        }

        &:hover {
            border-bottom-color: rgba(0,0,0,0.2);
        }
        &.router-link-exact-active {
            border-bottom-color: #25B9FF;
        }
    }

    .theme-dark {
        & .avatar {
            background-color: rgba(255,255,255,0.1);

            &:hover {
                border-bottom-color: rgba(255,255,255,0.2);
            }
        }
    }
</style>
