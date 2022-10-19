import { useMainStore } from './modules/Main'

export default function useStore() {
  return {
    main: useMainStore,
  }
}
