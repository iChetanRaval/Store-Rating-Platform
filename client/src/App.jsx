import axios from 'axios'
import { AuthProvider } from './state/auth.jsx'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || ''

export default function Root({ children }) {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	)
}
