<script lang="ts">
  import type { PageData } from "./$types";

    export let data: PageData;
    //console.log(data);
    
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each data.users as user}
     <!-- content here -->
     <span>{user.email}</span>
{/each}