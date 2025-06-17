<script lang="ts">
    let response: {
        masterKey?: string,
        clientId?: string,
    } = {};

    const inputs: Array<{
        id: keyof typeof response,
        title: string,
    }> = [
        {
            id: "masterKey",
            title: "Master key",
        },
        {
            id: "clientId",
            title: "Client ID",
        }
    ];
</script>

<main class="px-6 w-full h-screen bg-gray-300 flex items-center justify-center">
    <!-- Login form -->
    <div class="w-full bg-white rounded-xl shadow-xl p-6 py-12">
        <!-- todo: logotype -->
        <p class="text-center text-xl text-black font-bold mb-12">Авторизація</p>

        <!-- Inputs -->
        { #each inputs as input }
            <div class="my-3">
                <p class="font-medium text-sm text-opacity-70 mb-3">{ input.title }</p>

                <input class="w-full p-2 bg-gray-100 rounded-xl" type="text" id={input.id} on:change={(event) => console.log(event)} placeholder="··············">
            </div>
        { /each }

        <!-- Authorize button -->
        <button class="mt-6 w-full rounded-xl shadow-sm p-2 px-4 bg-blue-500 text-white">
            <p class="text-">Авторизуватись</p>
        </button>
    </div>
</main>