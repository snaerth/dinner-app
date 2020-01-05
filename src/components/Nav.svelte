<style>
  nav {
    background-color: #fff;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<script>
  import Dropdown from './dropdown.svelte'

  export let segment
</script>

<nav>
  <ul>
    <li>
      <a class:selected="{segment === undefined}" href=".">home</a>
    </li>
    <li>
      <a rel="prefetch" class:selected="{segment === 'signin'}" href="signin">
        Sign in
      </a>
    </li>
    <li>
      <a
        rel="prefetch"
        class:selected="{segment === 'register'}"
        href="register"
      >
        Register
      </a>
    </li>
    <Dropdown />
  </ul>
</nav>
