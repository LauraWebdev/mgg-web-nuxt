<template>
    <router-link :to="to" class="button" :class="filled != undefined ? 'button-filled' : ''"><slot></slot></router-link>
</template>

<script>
    export default {
        name: 'LinkButton',
        props: [
            'to',
            'filled'
        ]
    }
</script>