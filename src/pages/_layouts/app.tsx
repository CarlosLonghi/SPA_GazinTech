import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/10 to-primary/70 antialiased">
      <Header />

      <div className="m-auto flex w-full max-w-[64rem] flex-1 flex-col gap-4 px-4 pb-8 pt-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}
