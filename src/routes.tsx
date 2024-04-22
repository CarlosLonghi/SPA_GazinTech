import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { Notfound } from './pages/404'
import { Developers } from './pages/developers'
import { Home } from './pages/home'
import { Levels } from './pages/levels'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Notfound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/niveis', element: <Levels /> },
      { path: '/desenvolvedores', element: <Developers /> },
    ],
  },
])
