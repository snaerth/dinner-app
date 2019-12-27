<style lang="scss">
  .absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }

  .close {
    position: absolute;
    right: 1em;
    top: 1em;
    cursor: pointer;
    line-height: 0;
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
  <div
    class="close svg-white svg-grey-dark-hover"
    on:click="{closeHandler}"
    role="button"
    tabindex="0"
  >
    {@html CloseIcon}
  </div>
  <slot />
</div>
