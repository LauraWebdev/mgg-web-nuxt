<template>
    <div class="snackbar">
        <div v-for="item in items" v-bind:key="item.id" :class="`item ${item.stay ? 'hasClose' : ''}  ${item.active ? 'active' : ''}`">
            <div :class="`icon icon-${item.type}`"><span :class="`mdi mdi-${item.icon}`"></span></div>
            <div class="text">{{item.text}}</div>
            <div class="close" v-on:click="removeItem(item)" v-if="item.stay"><span class="mdi mdi-close"></span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Snackbar',
        data: function() {
            return {
                items: []
            }
        },
        mounted: function() {
            this.$root.$on('addSnackbar', (item) => {
                this.addItem(item.type, item.icon, item.text, item.stay);
            });
        },
        methods: {
            addItem: function(type, icon, text, stay) {
                let newItem = { id: this.$data.items.length - 1, active: true, type: type, text: text, icon: icon, stay: stay };
                this.$data.items.push(newItem);

                if(!stay) {
                    setTimeout(() => {
                        this.removeItem(newItem);
                    }, 3000);
                }
            },
            removeItem: function( item ) {
                let itemIndex = this.$data.items.indexOf(item);
                this.$data.items[itemIndex].active = false;

                setTimeout(() => {
                    itemIndex = this.$data.items.indexOf(item);
                    this.$data.items.splice(itemIndex, 1);
                }, 500);
            }
        }
    }
</script>

<style lang="less" scoped>
    .snackbar {
        position: fixed;
        bottom: 25px;
        right: 25px;
        z-index: 100;
        display: grid;
        grid-gap: 10px;
        cursor: default;

        & .item {
            background: #222;
            color: #fff;
            width: 90vw;
            max-width: 500px;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
            display: grid;
            grid-gap: 15px;
            grid-template-columns: 24px 1fr;
            animation: snackbarEntry 0.25s ease-in-out;
            opacity: 0;
            transition: 0.2s ease-in-out all;

            &.active {
                opacity: 1;
            }

            & .icon {
                font-size: 24px;

                &.icon-info {
                    color: #25b9ff;
                }
                &.icon-error {
                    color: #d3315f;
                }
                &.icon-success {
                    color: #00d198;
                }
            }

            & .text {
                opacity: 0.75;
                line-height: 1.5em;
                align-self: center;
            }

            &.hasClose {
                grid-template-columns: 24px 1fr auto;

                & .close {
                    align-self: center;
                    font-size: 24px;
                    transition: 0.2s ease-in-out all;

                    &:hover {
                        cursor: pointer;
                        opacity: 0.6;
                    }
                }
            }
        }
    }

    .theme-dark {
        & .item {
            background: #414141;
        }
    }

    @keyframes snackbarEntry {
        from {
            opacity: 0;
            transform: translateX(500px);
        }
        to {
            opacity: 1;
            transition: translateX(0px);
        }
    }
</style>