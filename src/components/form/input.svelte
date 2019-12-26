<style lang="scss">
  .pointer-events-all {
    pointer-events: all !important;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  export let label = ''
  export let placeholder = ''
  export let error = ''
  export let type = 'text'
  export let icon = ''
  export let autocomplete = ''
  export let value = ''
  export let switchIcon = false
  export let iconSwitch = false

  function handleKeydown(e) {
    dispatch(label.toLowerCase(), {
      value: e.target.value,
    })
  }

  function iconClick() {
    dispatch('iconSwitch')
  }
</script>

<div class="field">
  <label for="{label}" class="label">{label}</label>
  <div class="control has-icons-right">
    <input
      on:blur="{handleKeydown}"
      class="input is-medium"
      type="{type === 'password' && iconSwitch ? 'text' : type}"
      {placeholder}
      id="{label}"
      {autocomplete}
      {value}
    />
    {#if switchIcon && icon}
      <span
        class="icon is-right flexCenter pointer-events-all"
        role="button"
        tabindex="0"
        on:click="{iconClick}"
      >
        {@html iconSwitch ? switchIcon : icon}
      </span>
    {:else if icon}
      <span class="icon is-right flexCenter">
        {@html icon}
      </span>
    {/if}
  </div>
  {#if error}
    <p class="help is-danger">{error}</p>
  {/if}
</div>
