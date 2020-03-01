export default {
  home: {
    // svelte defines segment as undefined for root route
    name: undefined,
    href: '.',
    prefetch: true,
  },
  signin: {
    name: 'Sign in',
    href: 'signin',
    prefetch: true,
  },
  register: {
    name: 'Register',
    href: 'register',
    prefetch: true,
  },
  forgotPassword: {
    name: 'Forgot password',
    href: 'forgot-password',
    prefetch: false,
  },
}
