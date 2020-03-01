<style lang="scss">
  .formFooter {
    margin-top: 1em;
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
  import { passwordValidate } from '../utils/validations'
  import createInputsObj from '../utils/createInputsObj'
  import { passwordErrorMessage } from '../constants/errors'
  import { ENTER } from '../utils/keyCodes'
  import Input from '../components/form/input.svelte'
  import Notification from '../components/notification.svelte'
  import Center from '../components/center.svelte'
  import VisibilityIcon from '../assets/svg/visibility-24px.svg'
  import VisibilityOffIcon from '../assets/svg/visibility_off-24px.svg'

  const { session } = stores()

  let loading = false
  let errorMessage = []
  let notificationIsOpen = false
  let visibility = false
  // Create default input objects with state
  const { password } = createInputsObj(['password'])

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
    password.isDirty = true
    password.shake = true
    password.error = error

    setTimeout(() => {
      password.shake = false
    }, 820)
  }

  // Submit sign in
  async function submit() {
    loading = true

    if (!password.value) {
      password.value = document.getElementById('Password').value
    }

    if (!passwordValidate(password.value)) {
      password.isDirty = true
      password.error = passwordErrorMessage
      setError('password', passwordErrorMessage)
    }

    if (!password.error) {
      const res = await post('auth/signin', {
        password: password.value,
      })

      if (res.status === HttpStatus.OK) {
        const { user, jwt } = res.data
        // Set user in store
        userStore.set(user)
        $session.isAuthenticated = true
        $session.user = serialize(user)
        $session.jwt = serialize(jwt)
        goto('/')
      } else if (res.message && res.message[0] && res.message[0].messages) {
        errorMessage = res.message[0].messages
        notificationIsOpen = true
      } else {
        errorMessage = [{ message: res.data }]
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

    if (type === 'password') {
      if (!passwordValidate(value)) {
        setError('password', passwordErrorMessage)
      } else {
        password.error = false
      }

      password.value = value
    }
  }
</script>

<svelte:head>
  <title>Reset password</title>
</svelte:head>

<Center boxCenter>
  <div class="box is-relative is-clipped">
    <h1 class="has-text-centered is-size-3-mobile is-size-2">Reset password</h1>
    <p class="has-text-centered">Choose a new password</p>
    <form autocomplete="off" on:submit|preventDefault="{submit}">
      <Input
        label="New password"
        icon="{VisibilityIcon}"
        on:password="{handleInputChange}"
        switchIcon="{VisibilityOffIcon}"
        on:iconSwitch="{handleIconSwitch}"
        iconSwitch="{visibility}"
        type="password"
        error="{password.isDirty && password.error}"
        autocomplete="new-password"
        placholder="I am you password"
        value="{password.value}"
        shake="{password.shake}"
      />
      <div class="formFooter">
        <button
          class="button is-primary is-pulled-right"
          class:is-loading="{loading}"
          on:keydown="{onKeyDown}"
          type="submit"
        >
          <strong>Reset password</strong>
        </button>
      </div>
    </form>
    {#if errorMessage.length > 0 && notificationIsOpen}
      <Notification absolute on:close="{closeNotification}" error>
        <slot>
          {#each errorMessage as msg}{msg.message}{/each}
        </slot>
      </Notification>
    {/if}
  </div>
</Center>
