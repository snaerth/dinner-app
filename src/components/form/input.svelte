<style>
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.333em;
  }
</style>

<script>
  export let label = ''
  export let placeholder = ''
  export let error = ''
  export let type = 'text'
  export let icon = ''
</script>

<div class="field">
  <label for="{label}" class="label">{label}</label>
  <div class="control has-icons-right">
    <input class="input" {type} {placeholder} id="{label}" />
    {#if icon}
      <span class="icon is-right">
        {@html icon}
      </span>
    {/if}
  </div>
  <p class="help is-danger">{error}</p>
</div>
