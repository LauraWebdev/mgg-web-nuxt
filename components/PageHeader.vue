<template>
    <header :class="isNaviOpen ? 'navi-open' : ''">
        <div class="hamburger-item" v-on:click="toggleNavigation()"><span class="mdi mdi-menu"></span></div>

        <router-link :to="{name: 'DiscoveryIndex'}">
            <img src="@/assets/img/logoLight.svg" v-if="$store.state.uiMode == 'light'" class="logo" />
            <img src="@/assets/img/logoDark.svg" v-if="$store.state.uiMode == 'dark'" class="logo" />
        </router-link>

        <nav>
            <router-link :to="{name: 'DiscoveryIndex'}" class="item">{{ $t('header.nav.discover') }}</router-link>
            <router-link :to="{name: 'ChannelOverview'}" class="item">{{ $t('header.nav.channels') }}</router-link>
            <router-link :to="{name: 'Search'}" class="item">{{ $t('header.nav.find') }}</router-link>
            <router-link :to="{name: 'Talk'}" class="item">{{ $t('header.nav.talk') }}</router-link>
        </nav>

        <div class="actions" v-if="$store.state.userToken !== null && $store.state.userToken !== undefined">
            <AvatarItem v-bind="$store.state.userData"></AvatarItem>
            <IconItem v-bind:route="{name: 'GameAdd'}" v-bind:icon="'plus'"></IconItem>
            <IconItem v-bind:route="{name: 'PlaylistDetail', params: {id: $store.state.userData.playlists[0].id}}" v-bind:icon="'bookmark-outline'"></IconItem>
            <IconItem v-bind:route="{name: 'UserEdit', params: { id: $store.state.userData.id }}" v-bind:icon="'cog-outline'"></IconItem>
            <IconItem v-bind:route="{name: 'ModerationIndex'}" v-bind:icon="'security'" v-if="['moderator', 'admin'].some(str => $store.state.userRoles.includes(str))"></IconItem>
            <ThemeItem></ThemeItem>
            <IconItem v-bind:route="{name: 'Logout'}" v-bind:icon="'logout-variant'"></IconItem>
        </div>
        <div class="actions actions-unauthorized" v-if="$store.state.userToken === null || $store.state.userToken === undefined">
            <ThemeItem></ThemeItem>
            <LinkButton to="/auth/register" filled>{{ $t('header.actions.join') }}</LinkButton>
            <LinkButton to="/auth/login" class="button">{{ $t('header.actions.login') }}</LinkButton>
        </div>
    </header>
</template>

<script>
    import LinkButton from '@/components/General/LinkButton';
    import AvatarItem from '@/components/Header/AvatarItem';
    import ThemeItem from '@/components/Header/ThemeItem';
    import IconItem from '@/components/Header/IconItem';

    export default {
        name: 'PageHeader',
        components: {
            LinkButton,
            AvatarItem,
            IconItem,
            ThemeItem
        },
        data: function() {
            return {
                isNaviOpen: false
            }
        },
        methods: {
            toggleNavigation: function() {
                this.$data.isNaviOpen = !this.$data.isNaviOpen;
            }
        },
        watch:{
            '$route' () {
                this.$data.isNaviOpen = false;
            }
        } 
    }
</script>

<style lang="less">
    header {
        background: #fff;
        box-shadow: 0px 2px 18px rgba(0,0,0,0.14);
        display: grid;
        padding: 0px 25px;
        grid-template-columns: auto 1fr auto;
        grid-gap: 25px;
        align-items: center;
        position: relative;
        z-index: 50;

        & .hamburger-item {
            padding: 8px 0px;
            display: none;
            font-size: 26px;
            color: #222;
        }
        & .logo {
            height: 35px;
            margin: 7px 0px;
        }
        & nav {
            display: flex;
            align-items: center;

            & .item {
                font-size: 16px;
                text-decoration: none;
                padding: 12px 12px;
                border: 3px solid transparent;

                &:hover {
                    border-bottom-color: rgba(0,0,0,0.2);
                }
                &.router-link-exact-active {
                    border-bottom-color: #25B9FF;
                }
            }
        }
        & .actions {
            display: flex;

            &.actions-unauthorized {
                align-items: center;
                display: flex;

                & div {
                    padding: 5px 0px;
                }
                & a {
                    margin-left: 10px;
                }
            }
        }
    }

    .theme-dark {
        & header {
            background: #414141;


            & .hamburger-item {
                color: #fff;
            }
            & nav {
                & .item {
                    &:hover {
                        border-bottom-color: rgba(255,255,255,0.2);
                    }
                    &.router-link-exact-active {
                        border-bottom-color: #25B9FF;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1300px) {
        header {
            & .hamburger-item {
                display: flex;
            }
            & nav {
                display: none;
            }
            & .actions {
                display: none;

                &.actions-unauthorized {
                    display: none;
                }
            }

            &.navi-open {
                position: fixed;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                grid-template-columns: auto 1fr;
                grid-template-rows: auto 1fr auto;
                grid-gap: 0px 25px;
                align-items: flex-start;

                & nav {
                    display: grid;
                    grid-column: 1 / span 2;

                    & .item {
                        border-radius: 5px;

                        &.router-link-exact-active {
                            background: #25B9FF;
                            color: #fff;
                        }
                    }
                }
                & .actions {
                    display: flex;
                    justify-self: center;
                    grid-column: 1 / span 2;
                }
            }
        }
    }
</style>