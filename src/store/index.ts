import { useMainStore } from './modules/Main'
import { useLoginStore } from './modules/login'
import { useMatchStore } from './modules/match'
import localcache from '@/utils/cache'

export default function useStore() {
  return {
    main: useMainStore,
    login: useLoginStore,
    match: useMatchStore,
  }
}

export function setupStore() {
  useLoginStore().initUserDataAction(localcache.getSessionCache('userInfo'))
  useLoginStore().token = localcache.getSessionCache('token')
}
