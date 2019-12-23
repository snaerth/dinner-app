<script>
  import Input from '../components/form/input.svelte'
  import EmailIcon from '../assets/svg/email.svg'
</script>

<svelte:head>
  <title>Sign up</title>
</svelte:head>

<div class="box">
  <h1 class="has-text-centered">Sign up</h1>
  <form>
    <Input label="Username" icon="{EmailIcon}" />
    <Input label="Password" icon="{EmailIcon}" type="password" />
  </form>
</div>
