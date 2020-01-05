export default function createUser(writable) {
  const { subscribe, set, update } = writable(null)

  return {
    set,
    subscribe,
    update,
    delete: () => set(null),
  }
}
