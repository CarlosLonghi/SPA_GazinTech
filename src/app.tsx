import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

// import { LevelsProvider } from './contexts/LevelContext'
// import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | GazinTech" />
      <Toaster richColors position="top-right" />
      {/* <LevelsProvider> */}
      <RouterProvider router={router} />
      {/* </LevelsProvider> */}
    </HelmetProvider>
  )
}
