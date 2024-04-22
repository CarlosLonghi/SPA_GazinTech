import { Helmet } from 'react-helmet-async'

import { DevelopersProvider } from '@/contexts/developer-context'

import { ListDevelopers } from './list-developers'

export function Developers() {
  return (
    <>
      <Helmet title="Desenvolvedores" />
      <h1 className="text-2xl font-bold tracking-tight">
        Lista de Desenvolvedores
      </h1>
      <DevelopersProvider>
        <ListDevelopers />
      </DevelopersProvider>
    </>
  )
}
