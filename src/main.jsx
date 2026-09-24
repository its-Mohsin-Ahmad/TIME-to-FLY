import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { TravelProvider } from './context/TravelContext'
import { AdminProvider } from './context/AdminContext'
import './styles/index.css'

const routerBasename = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={routerBasename}>
    <TravelProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </TravelProvider>
  </BrowserRouter>,
)
