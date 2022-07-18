import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setToken } from '../store/store'

export function useToken() {
  const dispatch = useDispatch()
  const token = useSelector<RootState, string>((state) => state.token)
  useEffect(() => {
    if (window.__token__ && !token) {
      dispatch(setToken(window.__token__))
    }
  }, [])
  return [token]
}
