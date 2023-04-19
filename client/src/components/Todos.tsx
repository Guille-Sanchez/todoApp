import { useEffect, useState } from 'react'

interface TodoInterface {
  body: string
  userId: string
  id: string
}
type TodoType = TodoInterface[]

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Todos = ({ setLoading }: Props): JSX.Element => {
  const [notes, setNotes] = useState<TodoType | null>(null)

  useEffect(() => {
    let subscribed = true
    if (subscribed) {
      fetch('http://localhost:3000/api/todos')
        .then(async (response) => await response.json())
        .then((data) => {
          console.log(data)
          setLoading(() => true)
          setNotes(() => data)
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
      {notes?.map((note) => {
        return (
          <li key={note.id}>
            <p>{note.body}</p>
          </li>
        )
      })}
    </ul>)
  )
}
