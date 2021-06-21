<template>
    <router-link :to="{ name: 'ChannelDetail', params: { id: id }}" class="channel-item">
        <div class="title">#{{ title }}</div>
        <div class="games">
            <span>{{ gamesCount }}</span><span class="mdi mdi-google-controller"></span>
        </div>
        <div class="description">
            {{ description }}
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'ChannelItem',
        props: [
            'id',
            'title',
            'description',
            'gamesCount'
        ]
    }
</script>

<style lang="less" scoped>
    .channel-item {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
        grid-gap: 10px;
        text-decoration: none;
        transition: 0.2s ease-in-out all;
        padding: 15px;
        border-radius: 5px;
        background: rgba(0,0,0,0.07);

        & .title {
            font-size: 18px;
            font-weight: bold;
            letter-spacing: -0.05em;
        }

        & .description {
            grid-column: 1 / span 2;
            opacity: 0.6;
            line-height: 1.5em;
        }

        & .games {
            background: rgba(0,0,0,0.07);
            padding: 4px 15px;
            border-radius: 50px;
            font-size: 12px;
            justify-self: flex-start;
            line-height: 1.5em;
            display: flex;
            align-content: center;

            & .mdi {
                font-size: 18px;
                margin-left: 5px;
            }
        }

        &:hover {
            cursor: pointer;
            background: #fff;
            box-shadow: 0px 4px 16px 2px rgba(0,0,0,0.07);
        }
    }

    .theme-dark {
        & .channel-item {
            background: rgba(255,255,255,0.07);

            & .games {
                background: rgba(255,255,255,0.1);
            }

            &:hover {
                background: rgba(255,255,255,0.14);
            }
        }
    }
</style>