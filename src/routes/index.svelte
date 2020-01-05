<script context="module">
  export function preload(_, { isAuthenticated }) {
    return { isAuthenticated }
  }
</script>

<script>
  export let isAuthenticated
</script>

<svelte:head>
  <title>Dinner applications</title>
</svelte:head>

{#if isAuthenticated}
  <h1>Logged in</h1>
{:else}
  <h1>Not logged in</h1>
{/if}
