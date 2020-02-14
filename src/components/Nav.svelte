<style lang="scss">
  @import '../styles/variables.scss';

  .navbar-burger {
    cursor: pointer;
  }

  @media only screen and (min-width: $desktop) {
    .navbar-burger {
      display: none;
    }
  }
</style>

<script>
  import { afterUpdate } from 'svelte'
  import routes from '../routes'
  import Menu from './menu.svelte'
  import MenuIcon from '../assets/svg/menu-24px.svg'

  export let segment
  export let open = false
  let stateSegment = segment

  const routesRight = [routes.signin, routes.register]

  afterUpdate(() => {
    // if menu is open then close the menu
    // if location changes
    if (stateSegment !== segment) {
      open = false
      stateSegment = segment
    }
  })

  function menuClick() {
    open = !open
  }

  function closeMenu(e) {
    // Only close menu if event target tag name is DIV
    // Not other elements inside Menu are div elements except
    // the overlay container
    if (e.target.tagName === 'DIV') {
      open = false
    }
  }
</script>

<nav class="navbar is-primary">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">Dinner application</a>
      <span
        role="button"
        class="navbar-burger flexCenter"
        aria-label="menu"
        aria-expanded="false"
        on:click="{menuClick}"
      >
        {@html MenuIcon}
      </span>
    </div>
    <div class="navbar-end is-hidden-touch">
      {#each routesRight as route}
        <a
          class:is-active="{segment === route.name}"
          class="navbar-item"
          href="{route.href}"
          rel="prefetch"
        >
          {route.name}
        </a>
      {/each}
    </div>
  </div>
</nav>
{#if open}
  <Menu {closeMenu} />
{/if}
