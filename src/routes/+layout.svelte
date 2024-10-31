<script lang="ts">
    import { goto } from "$app/navigation";
    import { AuthorizationStore } from "$lib";
    import "../app.css";
    import { onMount } from "svelte";

    const isLoading = true;

    onMount(async () => {
        await AuthorizationStore.initialize();

        if (!AuthorizationStore.isAuthorized()) goto("/authorization");
    });
</script>

{ #if isLoading }
    <div class="w-full h-screen flex items-center justify-center bg-gray-200">
        <p class="font-medium text-base">Завантаження...</p>
    </div>
{ :else }
    <slot />
{ /if }