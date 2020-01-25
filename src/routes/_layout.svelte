<style lang="scss" global>
  @import '../styles/global.scss';
</style>

<script context="module">
  export async function preload(_, { nonce }) {
    return { nonce }
  }
</script>

<script>
  import Nav from '../components/nav.svelte'

  export let segment
  export let nonce
  console.log(segment)
</script>

<svelte:head>
  <script {nonce} src="//d2wy8f7a9ursnm.cloudfront.net/v6/bugsnag.min.js">

  </script>
  <script {nonce}>
    window.bugsnagClient = bugsnag('05d665fe0e3589b2b58ea8c5875082a7')
  </script>
</svelte:head>

<Nav {segment} />

<main class:flexCenter="{segment === 'signin' || segment === 'register'}">
  <slot />
</main>
