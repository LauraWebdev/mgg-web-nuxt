<template>
    <div class="page">
        <div class="page-centered">
            <div class="page-wrapper">
                <div class="tabs">
                    <router-link class="tab icon" :to="{ name: 'moderation-index' }"><span class="mdi mdi-home"></span></router-link>
                    <router-link class="tab" :to="{ name: 'moderation-queue' }">Queue</router-link>
                    <router-link class="tab" :to="{ name: 'moderation-userlist' }">Userlist</router-link>
                </div>
            </div>
        </div>

        <NuxtChild />
    </div>
</template>

<script>
    export default {
        meta: {
            title: 'Moderation Dashboard',
        },
        components: {
        },
        mounted: function () {
            if (!['moderator', 'admin'].some(str => this.$store.state.userRoles.includes(str))) {
                this.$root.$emit('addSnackbar', {
                    type: 'error',
                    icon: 'security',
                    text: 'You are not allowed to see this page.',
                    stay: true,
                });

                this.$router.push({ name: 'discovery-index' });
            }
        },
        methods: {
            checkAuthorization: function () {
                console.log(this.$store.state.userRoles);
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
