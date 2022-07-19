import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authRequestAsync, IUserData } from '../store/auth/actions'
import { RootState, setToken } from '../store/store'

export function useUserData() {
  const data = useSelector<RootState, IUserData>((state) => state.me.data)
  const loading = useSelector<RootState, boolean>((state) => state.me.loading)
  const token = useSelector<RootState, string>((state) => state.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (window.__token__ && !token) {
      dispatch(setToken(window.__token__))
    }
    if (!token) return

    dispatch(authRequestAsync())
  }, [token])

  return {
    data,
    loading,
  }
}
