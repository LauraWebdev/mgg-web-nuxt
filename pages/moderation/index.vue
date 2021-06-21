<template>
    <div class="page">
        <div class="page-centered">
            <div class="page-wrapper">
                <div class="tabs">
                    <router-link class="tab icon" :to="{ name: 'ModerationIndex' }"><span class="mdi mdi-home"></span></router-link>
                    <router-link class="tab" :to="{ name: 'ModerationQueue' }">Queue</router-link>
                    <router-link class="tab" :to="{ name: 'ModerationUserlist' }">Userlist</router-link>
                </div>
            </div>
        </div>
        
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'Moderation',
        metaInfo: {
            title: 'Moderation Dashboard',
        },
        components: {
        },
        mounted: function() {
            if(!['moderator', 'admin'].some(str => this.$store.state.userRoles.includes(str))) {
                this.$root.$emit('addSnackbar', {
                    type: "error",
                    icon: "security",
                    text: "You are not allowed to see this page.",
                    stay: true,
                });

                this.$router.push({name: 'DiscoveryIndex'});
            }
        },
        methods: {
            checkAuthorization: function() {
                console.log(this.$store.state.userRoles);
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
