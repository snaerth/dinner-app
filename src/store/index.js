import { writable } from 'svelte/store'
import createUser from './user'

export const user = createUser(writable)
