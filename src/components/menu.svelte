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
  import routes from '../routes'

  export let closeMenu
  export let segment

  const general = [routes.home]
  const authentication = [routes.signin, routes.register]
</script>

<div transition:fade="{{ duration: 100, opacity: 0.6 }}" on:click="{closeMenu}">
  <aside
    class="menu is-hidden-desktop"
    transition:fly="{{ opacity: 0.6, x: -window.innerWidth, easing: quintOut }}"
  >
    <p class="menu-label">General</p>
    <ul class="menu-list">
      {#each general as route}
        <li>
          <a class:is-active="{segment === route.name}" href="{route.href}">
            Home
          </a>
        </li>
      {/each}
    </ul>
    <p class="menu-label">Authentication</p>
    <ul class="menu-list">
      {#each authentication as route}
        <li>
          <a class:is-active="{segment === route.name}" href="{route.href}">
            {route.name}
          </a>
        </li>
      {/each}
    </ul>
  </aside>
</div>
