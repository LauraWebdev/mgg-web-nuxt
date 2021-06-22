<template>
    <div class="comment-item">
        <NuxtLink :to="{ name: 'user-id', params: { id: user.id }}" class="user">
            <div class="avatar" :style="`background-image: url('${ user.avatarFileName }')`"></div>
            <div class="username">{{ user.username }}</div>
            <div class="date">{{ createdFormatted }}</div>
        </NuxtLink>
        <div class="text">
            {{ text }}
        </div>
        <div class="actions" v-if="$store.state.userData != null ? user.id == $store.state.userData.id || ['moderator', 'admin'].some(str => $store.state.userRoles.includes(str)) : false">
            <button class="button button-filled" v-if="$store.state.userData.id == user.id || $store.state.userRoles" v-on:click="deleteComment()">{{ $t('comment.deleteButton') }}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChannelItem',
        props: {
            id: {
                type: Number,
                default: 0
            },
            user: {
                type: Object,
                default: null
            },
            text: {
                type: String,
                default: ''
            },
            createdAt: {
                type: String,
                default: null
            }
        },
        data: function () {
            return {
                createdFormatted: '',
            };
        },
        mounted: function () {
            this.$data.createdFormatted = new Date(Date.parse(this.$props.createdAt)).toLocaleDateString('en-US');
        },
        methods: {
            deleteComment: function () {
                this.$root.$emit('deleteComment', this.$props.id);
            }
        }
    };
</script>

<style lang="less" scoped>
    .comment-item {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-gap: 15px;
        text-decoration: none;
        padding: 15px;
        border-radius: 5px;
        background: rgba(0,0,0,0.07);

        & .user {
            display: grid;
            grid-template-columns: auto auto 1fr;
            grid-gap: 10px;
            align-content: center;
            text-decoration: none;
            transition: 0.2s ease-in-out opacity;

            & .avatar {
                width: 24px;
                height: 24px;
                background: rgba(0,0,0,0.1);
                background-position: center;
                background-size: cover;
                border-radius: 50%;
            }
            & .username {
                overflow: hidden;
            }
            & .date {
                opacity: 0.6;
            }

            &:hover {
                opacity: 0.6;
                cursor: pointer;
            }
        }
        & .text {
            line-height: 1.5em;
        }
    }

    .theme-dark {
        & .comment-item {
            background: rgba(255,255,255,0.07);
        }
    }
</style>
