import { useEffect, useState } from 'react'
import { type TodoInterface } from '../types'
import { Todo } from './Todo'
import jwt_decode, { type JwtPayload } from 'jwt-decode'

type TodoType = TodoInterface[]

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Todos = ({ setLoading }: Props): JSX.Element => {
  const AuthToken = localStorage.getItem('authToken')
  const [notes, setNotes] = useState<TodoType | null>(null)

  useEffect(() => {
    let subscribed = true
    let decoded: TodoInterface | null = null
    if (AuthToken !== null) {
      decoded = jwt_decode<JwtPayload>(AuthToken) as TodoInterface
    }

    if (subscribed) {
      fetch('http://localhost:3000/api/todos')
        .then(async (response) => await response.json())
        .then((data: TodoType) => {
          setLoading(() => true)
          // Add property called allow to show buttons to edit/delete notes to creator of note only
          const newData = data.map((todo) => {
            if (todo.userId[0] === decoded?.userId) {
              return { ...todo, allow: true }
            } else {
              return { ...todo, allow: false }
            }
          })
          setNotes(() => newData)
        })
        .finally(() => {
          setLoading(() => false)
        })
        .catch((err) => {
          console.log({ err })
        })
    }

    return () => {
      subscribed = false
    }
  }, [])

  return (
    (<ul>
      {notes?.map((todo) => {
        return (
          <Todo todo={todo} key={todo.id}/>
        )
      })}
    </ul>)
  )
}
