<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .boxCenter {
    width: 100%;
    max-width: 480px;
  }
</style>

<script>
  export let boxCenter
</script>

<div class:boxCenter>
  <slot />
</div>
