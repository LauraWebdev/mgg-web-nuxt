<script>
    export default {
        middleware ({ route, redirect, from }) {
            return redirect('/discovery');
        }
    };
</script>
