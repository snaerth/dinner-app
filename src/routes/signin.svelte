<style lang="scss">
  .formFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    margin-bottom: 2em;
  }
</style>

<script>
  import { emailValidate, passwordValidate } from '../utils/validations'
  import Input from '../components/form/input.svelte'
  import Notification from '../components/notification.svelte'
  import EmailIcon from '../assets/svg/email-24px.svg'
  import VisibilityIcon from '../assets/svg/visibility-24px.svg'
  import VisibilityOffIcon from '../assets/svg/visibility_off-24px.svg'

  let loading = false
  let errorMessage = []
  let notificationIsOpen = false
  let visibility = false

  const inputs = {
    username: {
      value: '69snaer',
      error: '',
      isDirty: false,
    },
    password: {
      value: 'JaN.C5.12',
      error: '',
      isDirty: false,
    },
  }

  function closeNotification(e) {
    const {
      detail: { isOpen },
    } = e

    notificationIsOpen = isOpen
  }

  async function submit() {
    loading = true
    const { username, password } = inputs

    if (!username.value) {
      username.value = document.getElementById('Username').value
    }

    if (!password.value) {
      password.value = document.getElementById('Password').value
    }

    if (!username.error && !password.error) {
      const body = JSON.stringify({
        identifier: username.value,
        password: password.value,
      })

      const res = await fetch('http://localhost:1337/auth/local', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      const data = await res.json()

      if (data.statusCode === 400) {
        errorMessage = data.message[0].messages
        notificationIsOpen = true
      }
    }

    loading = false
  }

  function handleIconSwitch() {
    visibility = !visibility
  }

  function handleInputChange(e) {
    const {
      type,
      detail: { value },
    } = e

    switch (type) {
      case 'username':
        inputs.username.isDirty = true
        inputs.username.error = !emailValidate(value) ? 'Email is invalid' : ''
        inputs.username.value = value
        break

      case 'password':
        inputs.password.isDirty = true
        inputs.password.error = !passwordValidate(value)
          ? 'Password minimum length 8 characters and maximum length 100'
          : ''
        inputs.password.value = value
        break

      default:
        break
    }
  }
</script>

<svelte:head>
  <title>Sign in</title>
</svelte:head>
<div class="box is-relative is-clipped">
  <h1 class="has-text-centered is-size-3-mobile">Log into you account</h1>
  <a href="register" class="has-text-centered">Need an account?</a>
  <form autocomplete="off" on:submit|preventDefault="{submit}">
    <Input
      label="Username"
      icon="{EmailIcon}"
      on:username="{handleInputChange}"
      error="{inputs.username.isDirty && inputs.username.error}"
      autocomplete="off"
      placeholder="someone@any.com"
      value="{inputs.username.value}"
    />
    <Input
      label="Password"
      icon="{VisibilityIcon}"
      on:password="{handleInputChange}"
      switchIcon="{VisibilityOffIcon}"
      on:iconSwitch="{handleIconSwitch}"
      iconSwitch="{visibility}"
      type="password"
      error="{inputs.password.isDirty && inputs.password.error}"
      autocomplete="new-password"
      placholder="I am you password"
      value="{inputs.password.value}"
    />
    <div class="formFooter">
      <div class="field is-marginless">
        <input
          class="is-checkradio"
          id="rememberme"
          type="checkbox"
          name="rememberme"
          checked="checked"
        />
        <label for="rememberme">Remember me</label>
      </div>
      <button
        class="button is-primary"
        class:is-loading="{loading}"
        type="submit"
      >
        SIGN IN
      </button>
    </div>
  </form>
  {#if errorMessage.length > 0 && notificationIsOpen}
    <Notification absolute on:close="{closeNotification}">
      <slot>
        {#each errorMessage as msg}{msg.message}{/each}
      </slot>
    </Notification>
  {/if}
</div>
