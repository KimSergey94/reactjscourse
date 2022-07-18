import React from 'react'
import { useUserData } from '../../hooks/useUserData'

interface IUserContextData {
  name?: string
  iconImg?: string
}
interface IUserContextData2 {
  data?: IUserContextData
  loading?: boolean
}
export const userContext = React.createContext<IUserContextData2>({})

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data, loading } = useUserData()
  return (
    <userContext.Provider value={{ data, loading } ?? {}}>
      {children}
    </userContext.Provider>
  )
}
