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
  export let success
  export let error

  const dispatch = createEventDispatcher()

  function closeHandler() {
    dispatch('close', {
      isOpen: false,
    })
  }
</script>

<div
  class="notification"
  class:absolute
  class:is-success="{success}"
  class:is-danger="{error}"
  transition:fly="{{ duration: 700, y: -300, easing: quintOut }}"
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
