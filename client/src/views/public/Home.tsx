import { Todos } from '../../components/Todos'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Home = (): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const storedAuthToken = localStorage.getItem('authToken')

  return (
    <>
      <div>
        {storedAuthToken === null && <button>Sign Up</button>}
        <button><Link to='/sign-in'>Login</Link></button>
        {
          storedAuthToken !== null &&
          <button onClick={(e) => {
            e.preventDefault()
            localStorage.removeItem('authToken')
            window.location.href = '/'
          }
          }>
            Logout
          </button>
        }
      </div>
      {
        !loading
          ? <Todos setLoading={setLoading}/>
          : <p>Loading</p>
      }
    </>
  )
}
