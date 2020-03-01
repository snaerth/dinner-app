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
  import HttpStatus from 'http-status-codes'
  import { post } from '../services/http'
  import { emailValidate } from '../utils/validations'
  import { emailErrorMessage } from '../constants/errors'
  import { ENTER } from '../utils/keyCodes'
  import createInputsObj from '../utils/createInputsObj'
  import Input from '../components/form/input.svelte'
  import Notification from '../components/notification.svelte'
  import Center from '../components/center.svelte'
  import EmailIcon from '../assets/svg/email-24px.svg'

  let loading = false
  let errorMessage = []
  let notificationIsOpen = false
  let showEmailNotification = false
  // Create default input objects with state
  const { email } = createInputsObj(['email'])

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
    email.isDirty = true
    email.shake = true
    email.error = error

    setTimeout(() => {
      email.shake = false
    }, 820)
  }

  // Submit sign in
  async function submit() {
    loading = true
    showEmailNotification = false

    if (!email.value) {
      email.value = document.getElementById('Email').value
    }

    if (!emailValidate(email.value)) {
      email.isDirty = true
      email.error = emailErrorMessage
      setError('email', emailErrorMessage)
    }

    if (!email.error) {
      const res = await post('auth/forgot-password', {
        email: email.value,
      })

      if (
        res.status === HttpStatus.BAD_REQUEST ||
        (res.data && res.data.statusCode === HttpStatus.BAD_REQUEST)
      ) {
        errorMessage = res.data.message[0].messages
        notificationIsOpen = true
      } else if (res.data.ok) {
        showEmailNotification = true
        notificationIsOpen = true
      }
    }

    loading = false
  }

  function handleInputChange(e) {
    const {
      type,
      detail: { value },
    } = e

    if (type === 'email') {
      if (!emailValidate(value)) {
        setError('email', emailErrorMessage)
      } else {
        email.error = false
      }

      email.value = value
    }
  }
</script>

<svelte:head>
  <title>Forgot password</title>
</svelte:head>

<Center boxCenter>
  <div class="box is-relative is-clipped">
    <h1 class="has-text-centered is-size-3-mobile is-size-2">
      Forgot password?
    </h1>
    <p class="has-text-centered">
      Locked out? We'll send you instructions to reset you password and get you
      back on track.
    </p>
    <form autocomplete="off" on:submit|preventDefault="{submit}">
      <Input
        label="Email"
        icon="{EmailIcon}"
        on:email="{handleInputChange}"
        error="{email.isDirty && email.error}"
        autocomplete="off"
        placeholder="someone@any.com"
        value="{email.value}"
        shake="{email.shake}"
      />
      <div class="formFooter">
        <button
          class="button is-primary is-pulled-right"
          class:is-loading="{loading}"
          on:keydown="{onKeyDown}"
          type="submit"
        >
          <strong>Email me</strong>
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
    {#if showEmailNotification && notificationIsOpen}
      <Notification absolute on:close="{closeNotification}" success>
        <slot>We have e-mailed you your password reset link!</slot>
      </Notification>
    {/if}
  </div>
</Center>
