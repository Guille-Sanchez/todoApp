import { Todos } from '../components/Todos'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Home = (): JSX.Element => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div>
        <button><Link to='/sign-in'>Login</Link></button>
        <button>Logout</button>
      </div>
      {
        !loading
          ? <Todos setLoading={setLoading}/>
          : <p>Loading</p>
      }
    </>
  )
}
