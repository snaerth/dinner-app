<style lang="scss">
  .formFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;
  }

  h1 {
    margin-top: 0.5em;
  }

  p {
    margin-bottom: 3em;
  }

  .box {
    width: 100%;
    max-width: 30em;
    margin: 0 auto;
  }
</style>

<script>
  import serialize from 'serialize-javascript'
  import HttpStatus from 'http-status-codes'
  import { goto, stores } from '@sapper/app'
  import { user as userStore } from '../store'
  import { post } from '../services/http'
  import {
    emailValidate,
    passwordValidate,
    usernameValidate,
  } from '../utils/validations'
  import {
    emailErrorMessage,
    passwordErrorMessage,
    usernameErrorMessage,
  } from '../constants/errors'
  import { ENTER } from '../utils/keyCodes'
  import createInputsObj from '../utils/createInputsObj'
  import Input from '../components/form/input.svelte'
  import Notification from '../components/notification.svelte'
  import Center from '../components/center.svelte'
  import EmailIcon from '../assets/svg/email-24px.svg'
  import PersonIcon from '../assets/svg/person-24px.svg'
  import VisibilityIcon from '../assets/svg/visibility-24px.svg'
  import VisibilityOffIcon from '../assets/svg/visibility_off-24px.svg'

  const { session } = stores()

  let loading = false
  let errorMessage = []
  let notificationIsOpen = false
  let visibility = false
  // Create default input objects with state
  const inputs = createInputsObj(['username', 'email', 'password'])

  // Submit button keydown event
  function onKeyDown(e) {
    if (e.keyCode === ENTER) {
      submit()
    }
  }

  /**
   * Close notification event
   * @param {Object} e Svelte event dispatcher
   * */
  function closeNotification(e) {
    const {
      detail: { isOpen },
    } = e

    notificationIsOpen = isOpen
  }

  /**
   * Sets error state on input object
   * @param {String} type input property name
   * @param {String} error error message
   */
  function setError(type, error) {
    inputs[type].isDirty = true
    inputs[type].shake = true
    inputs[type].error = error

    setTimeout(() => {
      inputs[type].shake = false
    }, 820)
  }

  // Submit sign in
  async function submit() {
    loading = true

    if (!inputs.username.value) {
      inputs.username.value = document.getElementById('Username').value
    }

    if (!usernameValidate(inputs.username.value)) {
      inputs.email.isDirty = true
      inputs.email.error = usernameErrorMessage
      setError('username', usernameErrorMessage)
    }

    if (!inputs.email.value) {
      inputs.email.value = document.getElementById('Email').value
    }

    if (!emailValidate(inputs.email.value)) {
      inputs.email.isDirty = true
      inputs.email.error = emailErrorMessage
      setError('email', emailErrorMessage)
    }

    if (!inputs.password.value) {
      inputs.password.value = document.getElementById('Password').value
    }

    if (!passwordValidate(inputs.password.value)) {
      inputs.password.isDirty = true
      inputs.password.error = passwordErrorMessage
      setError('password', passwordErrorMessage)
    }

    if (
      !inputs.email.error &&
      !inputs.password.error &&
      !inputs.username.error
    ) {
      const res = await post('auth/register', {
        email: inputs.email.value,
        password: inputs.password.value,
      })

      if (
        res.status === HttpStatus.BAD_REQUEST ||
        (res.data && res.data.statusCode === HttpStatus.BAD_REQUEST)
      ) {
        errorMessage = res.data.message[0].messages
        notificationIsOpen = true
      } else if (res.data) {
        const { user, jwt } = res.data
        // Set user in store
        userStore.set(user)
        $session.isAuthenticated = true
        $session.user = serialize(user)
        $session.jwt = serialize(jwt)
        goto('/')
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
        if (!usernameValidate(value)) {
          setError('username', usernameErrorMessage)
        } else {
          inputs.username.error = false
        }

        inputs.username.value = value
        break

      case 'email':
        if (!emailValidate(value)) {
          setError('email', emailErrorMessage)
        } else {
          inputs.email.error = false
        }

        inputs.email.value = value
        break

      case 'password':
        if (!passwordValidate(value)) {
          setError('password', passwordErrorMessage)
        } else {
          inputs.password.error = false
        }

        inputs.password.value = value
        break

      default:
        break
    }
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<Center boxCenter>
  <div class="box is-relative is-clipped">
    <h1 class="has-text-centered is-size-3-mobile is-size-2">Create account</h1>
    <p class="has-text-centered">
      Already have an account?
      <a href="signin" class="has-text-centered">Login here</a>
    </p>
    <form autocomplete="off" on:submit|preventDefault="{submit}">
      <Input
        label="Username"
        icon="{PersonIcon}"
        on:username="{handleInputChange}"
        error="{inputs.username.isDirty && inputs.username.error}"
        autocomplete="off"
        placeholder="username"
        value="{inputs.username.value}"
        shake="{inputs.username.shake}"
      />
      <Input
        label="Email"
        icon="{EmailIcon}"
        on:email="{handleInputChange}"
        error="{inputs.email.isDirty && inputs.email.error}"
        autocomplete="off"
        placeholder="someone@any.com"
        value="{inputs.email.value}"
        shake="{inputs.email.shake}"
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
        shake="{inputs.password.shake}"
      />
      <div class="formFooter is-pulled-right">
        <button
          class="button is-primary"
          class:is-loading="{loading}"
          on:keydown="{onKeyDown}"
          type="submit"
        >
          Register
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
</Center>
