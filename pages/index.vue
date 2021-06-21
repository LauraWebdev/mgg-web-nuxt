<template>
    <div class="page">
        <div class="page-centered">
            <div class="page-wrapper">
                <div class="tabs">
                    <router-link class="tab icon" :to="{ path: '/discovery' }"><span class="mdi mdi-home"></span></router-link>
                    <router-link class="tab" :to="{ path: '/discovery/newest' }">{{ $t('index.newestHeader') }}</router-link>
                    <router-link class="tab" :to="{ path: '/discovery/hotThisWeek' }">{{ $t('index.hotThisWeekHeader') }}</router-link>
                    <router-link class="tab" :to="{ path: '/discovery/random' }">{{ $t('index.randomHeader') }}</router-link>
                    <router-link class="tab" :to="{ path: '/discovery/popular' }">{{$t('index.popularHeader') }}</router-link>
                </div>
            </div>
        </div>

        <NuxtChild />
    </div>
</template>

<script>
    export default {
        middleware ({ route, redirect, from }) {
            console.log(route);
            console.log(redirect);
            console.log(from);

            if (route.path === '/' || route.path === '') {
                return redirect('/discovery');
            }
        }
    }
</script>

<style lang="less" scoped>
</style>
