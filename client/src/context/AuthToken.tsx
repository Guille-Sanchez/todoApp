import { createContext, useState } from 'react'

interface Props {
  children: React.ReactNode
}

export interface initialStateInterface {
  AuthToken: string | null
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>
}

const initialState: initialStateInterface = {
  AuthToken: null,
  setAuthToken: () => {}
}

export const AuthTokenContext = createContext(initialState)

export const AuthTokenProvider = ({ children }: Props): JSX.Element => {
  const [AuthToken, setAuthToken] = useState(initialState.AuthToken)

  return (
    <AuthTokenContext.Provider value={{ AuthToken, setAuthToken }}>
      {children}
    </AuthTokenContext.Provider>
  )
}
