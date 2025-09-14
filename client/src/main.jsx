import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './routes/App.jsx'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import Signup from './routes/Signup.jsx'
import Stores from './routes/Stores.jsx'
import Admin from './routes/Admin.jsx'
import Owner from './routes/Owner.jsx'
import Profile from './routes/Profile.jsx'
import Protected from './routes/Protected.jsx'
import Privacy from './routes/Privacy.jsx'
import Terms from './routes/Terms.jsx'
import About from './routes/About.jsx'
import Root from './App.jsx'
import './index.css'

const router = createBrowserRouter([
	{ path: '/', element: <App />, children: [
		{ index: true, element: <Home /> },
		{ path: 'stores', element: <Stores /> },
		{ path: 'admin', element: <Protected roles={['admin']}><Admin /></Protected> },
		{ path: 'owner', element: <Protected roles={['owner']}><Owner /></Protected> },
		{ path: 'profile', element: <Protected><Profile /></Protected> },
		{ path: 'privacy', element: <Privacy /> },
		{ path: 'terms', element: <Terms /> },
		{ path: 'about', element: <About /> },
	]},
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <Signup /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Root>
			<RouterProvider router={router} />
		</Root>
	</React.StrictMode>,
)
