<script lang="ts">
    import { goto } from "$app/navigation";
    import { AuthorizationStore } from "$lib";
    import { onMount } from "svelte";

    onMount(() => {
        if (!AuthorizationStore.isAuthorized()) goto("/authorization");
    });
</script>

<slot />