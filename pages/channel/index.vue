<template>
    <div class="page-channelOverview">
        <div class="page-centered page-header">
            <div class="page-wrapper">
                <h1>{{ $t('channelOverview.header') }}</h1>
                <p>{{ $t('channelOverview.explaination') }}</p>
            </div>
        </div>

        <div class="page-centered page-channelList">
            <div class="page-wrapper">
                <ChannelList>
                    <ChannelItem v-for="channel in channels" v-bind:key="channel.id" v-bind="channel"></ChannelItem>
                </ChannelList>
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '@/modules/api';

    import ChannelList from '@/components/Channel/ChannelList';
    import ChannelItem from '@/components/Channel/ChannelItem';

    export default {
        name: 'ChannelOverview',
        metaInfo: {
            title: 'Channel Overview',
        },
        components: {
            ChannelList,
            ChannelItem,
        },
        data: function () {
            return {
                apiRef: null,
                channels: [],
            }
        },
        async asyncData ({ params, $http }) {
                try {
                    const api = new MGGApi();

                    const channels = await api.getAllChannels();

                    return { channels };
                } catch (error) {
                    console.error(error);
                }
        },
    }
</script>

<style lang="less" scoped>
    .page-channelList {
        margin: 50px 0px;
    }
</style>
