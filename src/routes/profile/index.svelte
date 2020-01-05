<script context="module">
  import authenticated from '../../utils/authenticated'
  import HttpStatus from 'http-status-codes'

  export function preload(_, session) {
    const {
      user: { username },
    } = session
    if (authenticated(session)) {
      this.redirect(
        HttpStatus.MOVED_TEMPORARILY,
        authenticated(session) ? `/profile/${username}` : '/'
      )
    } else {
      this.redirect(HttpStatus.FORBIDDEN, '/')
    }
  }
</script>
