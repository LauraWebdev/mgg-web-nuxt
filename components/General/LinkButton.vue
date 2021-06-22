<template>
    <NuxtLink :to="to" class="button" :class="filled != undefined ? 'button-filled' : ''"><slot></slot></NuxtLink>
</template>

<script>
    export default {
        name: 'LinkButton',
        props: {
            to: {
                type: Object,
                default: null
            },
            filled: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
