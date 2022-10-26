import { useMainStore } from './modules/Main'
import { useLoginStore } from './modules/login'
import localcache from '@/utils/cache'

export default function useStore() {
  return {
    main: useMainStore,
    login: useLoginStore,
  }
}

export function setupStore() {
  useLoginStore().initUserDataAction(localcache.getCache('userInfo'))
  useLoginStore().token = localcache.getCache('token')
}
