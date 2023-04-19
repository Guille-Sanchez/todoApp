import { useState } from 'react'
import { type TodoInterface } from '../types'

interface Props {
  todo: TodoInterface
}

export const Todo = ({ todo }: Props): JSX.Element => {
  const [editTodo, setEditTodo] = useState(false)
  const [newBody, setNewBody] = useState('')

  const onClickEditTodo = (): void => {
    setEditTodo(() => false)
    setNewBody(() => '')

    fetch(`http://localhost:3000/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken') ?? ''}`
      },
      body: JSON.stringify({ body: newBody, id: todo.id })
    })
      .then(async (res) => await res.json())
      .then((data) => { console.log(data) })
      .catch((err) => { console.log(err) })
  }

  return (
    <li key={todo.id}>
      {
        !editTodo
          ? <p>{todo.body}</p>
          : <input type="text"
              value={newBody}
              onChange={e => {
                setNewBody(() => e.target.value)
              }}
            />
      }
      { todo.allow &&
        <div>
          { !editTodo
            ? (
                <button onClick={() => {
                  setEditTodo(() => true)
                  setNewBody(() => todo.body)
                }}>
                  Edit
                </button>
              )

            : (
              <button onClick={() => {
                setEditTodo(() => false)
                setNewBody(() => '')
              }}>
                Cancel
              </button>
              )
        }
        { !editTodo
          ? (
              <button onClick={() => {
                console.log('delete')
              }}>
                Delete
              </button>
            )
          : (
              <button onClick={() => {
                onClickEditTodo()
              }}>
                Save
              </button>
            )
        }
        </div>
      }
      <hr/>
    </li>
  )
}
