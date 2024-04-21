import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-primary/75 antialiased">
      <Header />

      <div className="m-auto flex max-w-[64rem] flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
