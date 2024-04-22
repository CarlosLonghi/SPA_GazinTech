import { Helmet } from 'react-helmet-async'

import { LevelsProvider } from '../../contexts/level-context'
import { ListLevels } from './list-levels'

export function Levels() {
  return (
    <>
      <Helmet title="Níveis" />
      <h1 className="text-2xl font-bold tracking-tight">Lista de Níveis</h1>
      <LevelsProvider>
        <ListLevels />
      </LevelsProvider>
    </>
  )
}
