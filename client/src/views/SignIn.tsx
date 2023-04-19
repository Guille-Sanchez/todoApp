import { useContext, useState } from 'react'
import { AuthTokenContext } from '../context/AuthToken'

export const SignIn = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const { setAuthToken } = useContext(AuthTokenContext)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget))
    console.log('hola')

    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(async (res) => {
        if (res.status === 401) {
          setError(() => 'Unauthorized')
          throw new Error('Unauthorized')
        }
        return await res.json()
      })
      .then((data) => {
        setError(() => null)
        setAuthToken(() => data.token)

        // redirect to home page
        window.location.href = '/'
      })
      .catch((err) => {
        setError(() => err.message)
      })
  }

  return (
    <>
      <form onSubmit={(e) => { handleOnSubmit(e) }}>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="example@gmail.com" name="email" id="email"/>

        <label htmlFor="password">Password</label>
        <input type="password" autoComplete="off" name="password" id="password"/>
        <button>Submit</button>
      </form>
      {error !== null && <p>{error}</p>}
    </>
  )
}
