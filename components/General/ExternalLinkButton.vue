<template>
    <a :href="href" target="_blank" class="button" :class="filled != undefined ? 'button-filled' : ''"><slot></slot></a>
</template>

<script>
    export default {
        name: 'LinkButton',
        props: [
            'href',
            'filled'
        ]
    }
</script>