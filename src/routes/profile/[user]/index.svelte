<script context="module">
  import HttpStatus from 'http-status-codes'

  export async function preload(_, { user, jwt }) {
    if (user) {
      return { user, jwt }
    }

    this.redirect(HttpStatus.MOVED_TEMPORARILY, '/signin')
  }
</script>

<script>
  export let user
  export let jwt
</script>

<h1>{user.username}</h1>
<h1>{jwt}</h1>
