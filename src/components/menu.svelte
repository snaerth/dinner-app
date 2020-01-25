<style lang="scss">
  @import '../styles/variables.scss';

  div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: $z-index-menu;
  }

  aside {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 270px;
    padding: $gap;
    background-color: $white;
  }
</style>

<script>
  import { fly, fade } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'

  export let closeMenu
</script>

<div transition:fade="{{ duration: 100, opacity: 0.6 }}" on:click="{closeMenu}">
  <aside
    class="menu is-hidden-desktop"
    transition:fly="{{ opacity: 0.6, x: -window.innerWidth, easing: quintOut }}"
  >
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li>
        <a href=".">Home</a>
      </li>
    </ul>
    <p class="menu-label">Authentication</p>
    <ul class="menu-list">
      <li>
        <a href="signin">Sign in</a>
      </li>
      <li>
        <a href="register">Register</a>
      </li>
    </ul>
  </aside>
</div>
