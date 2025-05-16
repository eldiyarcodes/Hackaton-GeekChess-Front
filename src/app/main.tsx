import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './config/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ToastContainer position='top-right' autoClose={3000} />
		<App />
	</StrictMode>
)
