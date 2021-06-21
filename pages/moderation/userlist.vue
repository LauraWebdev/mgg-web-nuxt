<template>
    <div class="page-centered">
        <div class="page-wrapper page-loading" v-if="apiLoading">
            <LoadingCircle />
        </div>
        <h1 v-if="!apiLoading">All Users</h1>
        <div class="page-wrapper page-moderation-list" v-if="!apiLoading">
            <div class="header">
                <div>ID</div>
                <div>Username</div>
                <div>Actions</div>
            </div>
            <div class="item" v-for="user in allUsers" v-bind:key="user.id" :class="user.banActive ? 'banned' : ''">
                <div>{{ user.id }}</div>
                <div>{{ user.username }}</div>
                <div>
                    <router-link :to="{ name: 'UserDetail', params: { id: user.id } }" target="_blank" class="button">Show</router-link>
                    <router-link :to="{ name: 'UserEdit', params: { id: user.id } }" target="_blank" class="button">Edit</router-link>
                    <router-link :to="{ name: 'ModerationBan', params: { id: user.id } }" v-if="$store.state.userData.id != user.id" class="button">Ban</router-link>
                </div>
            </div>
        </div>

        <h1 v-if="!apiLoading"><br />Banned Users</h1>
        <div class="page-wrapper page-moderation-list list-banned" v-if="!apiLoading">
            <div class="header">
                <div>ID</div>
                <div>Username</div>
                <div>Actions</div>
            </div>
            <div class="item" v-for="user in bannedUsers" v-bind:key="user.id">
                <div>{{ user.id }}</div>
                <div>{{ user.username }}</div>
                <div>
                    <router-link :to="{ name: 'UserDetail', params: { id: user.id } }" target="_blank" class="button">Show</router-link>
                    <router-link :to="{ name: 'UserEdit', params: { id: user.id } }" target="_blank" class="button">Edit</router-link>
                    <router-link :to="{ name: 'ModerationBan', params: { id: user.id } }" target="_blank" class="button">Unban</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MGGApi from '../../modules/api';
    
    import LoadingCircle from '@/components/General/LoadingCircle';

    export default {
        name: 'ModerationUserlist',
        metaInfo: {
            title: 'Userlist',
        },
        components: {
            LoadingCircle
        },
        data: function() {
            return {
                apiRef: null,
                apiLoading: true,
                allUsers: [],
                bannedUsers: []
            }
        },
        created: function() {
            this.$data.apiRef = new MGGApi();
        },
        mounted: function() {
            this.loadUsers();
        },
        methods: {
            loadUsers: async function() {
                this.$data.apiLoading = true;
                try {
                    this.$data.allUsers = await this.$data.apiRef.getAllUsers();
                    this.$data.apiLoading = false;

                    this.$data.allUsers.forEach(user => {
                        if(user.banActive) {
                            this.$data.bannedUsers.push(user);
                        }
                    });
                } catch(error) {
                    console.error(error);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-loading {
        margin: 100px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & .page-moderation-list {
        display: grid;
        border-radius: 5px;
        border: 2px solid rgba(0,0,0,0.14);

        & .header {
            padding: 5px 10px;
            display: grid;
            font-weight: bold;
            background: rgba(0,0,0,0.07);
            grid-template-columns: 50px 1fr 300px;
        }

        & .item {
            padding: 5px 10px;
            display: grid;
            border-top: 2px solid rgba(0,0,0,0.14);
            grid-template-columns: 50px 1fr 300px;
            align-items: center;

            & .button {
                margin-right: 5px;
            }

            &:hover {
                background: rgba(0,0,0,0.035);
            }

            &.banned {
                background: #fd084d11;

                &:hover {
                    background: #fd084d22 !important;
                }
            }
        }

        & .noresults {
            border-top: 2px solid rgba(0,0,0,0.14);
            padding: 50px 0px;
            text-align: center;
            opacity: 0.6;
        }

        &.list-banned {
            border-color: #fd084d66;

            & .header {
                background: #fd084d22;
            }

            & .item {
                border-top-color: #fd084d66;

                &:hover {
                    background: #fd084d11;
                }
            }
        }
    }

    .theme-dark {
        & .page-moderation-list:not(.list-banned) {
            border-color: rgba(255,255,255,0.4);

            & .header {
                background: rgba(255,255,255,0.14);
            }

            & .item {
                border-top-color: rgba(255,255,255,0.4);

                &:hover {
                    background: rgba(255,255,255,0.07);
                }
            }

            & .noresults {
                border-top-color: rgba(255,255,255,0.4);
            }
        }
    }
</style>
