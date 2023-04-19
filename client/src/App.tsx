import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './views/public/Home'
import { SignIn } from './views/public/SignIn'

function App (): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
