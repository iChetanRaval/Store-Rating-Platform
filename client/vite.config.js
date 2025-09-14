import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		proxy: {
			'/auth': 'http://localhost:5000',
			'/admin': 'http://localhost:5000',
			'/stores': 'http://localhost:5000',
			'/owner': 'http://localhost:5000',
		},
	},
})
