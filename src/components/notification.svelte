<style lang="scss">
  .absolute {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 5;
  }

  button:hover svg {
    fill: red;
  }
</style>

<script>
  import { fly } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import { createEventDispatcher } from 'svelte'
  import CloseIcon from '../assets/svg/close-24px.svg'

  export let absolute = false

  const dispatch = createEventDispatcher()

  function closeHandler() {
    dispatch('close', {
      isOpen: false,
    })
  }
</script>

<div
  class="notification is-danger"
  class:absolute
  transition:fly="{{ delay: 100, duration: 700, x: 0, y: -150, opacity: 0.5, easing: quintOut }}"
>
  <button
    class="button is-transparent delete svg-white-on-hover fadeIn"
    on:click="{closeHandler}"
  >
    {@html CloseIcon}
  </button>
  <slot />
</div>
