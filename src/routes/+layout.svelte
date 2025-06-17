<script lang="ts">
    import { goto } from "$app/navigation";
    import { AuthorizationStore, PersistentStore } from "$lib";
    import "../app.css";
    import { onMount } from "svelte";

    import SolarMinimizeOutline from '~icons/solar/minimize-outline';
    import MaterialSymbolsCloseRounded from '~icons/material-symbols/close-rounded';

    let isLoading = true;

    onMount(async () => {
        await AuthorizationStore.initialize();

        if (!AuthorizationStore.isAuthorized()) goto("/authorization");

        isLoading = false;
    });
</script>

<!-- Header -->
<header class="fixed top-0 w-full flex items-center justify-between p-3 bg-gray-900 text-white">
    <!-- Logotype -->
    <p class="text-center lowercase font-bold">telecrm</p>

    <!-- Controls -->
    <div class="flex items-center gap-2">
        <button class="p-2 hover:bg-white hover:text-black rounded-full transition duration-150">
            <SolarMinimizeOutline class="w-4 h-4" />
        </button>

        <button class="p-2 hover:bg-white hover:text-black rounded-full transition duration-150">
            <MaterialSymbolsCloseRounded class="w-4 h-4" />
        </button>
    </div>
</header>

{ #if isLoading }
    <div class="w-full h-screen flex items-center justify-center bg-gray-200">
        <p class="font-medium text-base">Завантаження...</p>
    </div>
{ :else }
    <slot />
{ /if }