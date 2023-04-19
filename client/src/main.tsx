import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthTokenProvider } from './context/AuthToken'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthTokenProvider>
      <App />
    </AuthTokenProvider>
    </BrowserRouter>
  </React.StrictMode>
)
