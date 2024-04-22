import { Helmet } from 'react-helmet-async'

import { LevelsProvider } from '../../contexts/LevelContext'
import { ListLevels } from './list-levels'

export function Levels() {
  return (
    <>
      <Helmet title="Níveis" />
      <LevelsProvider>
        <ListLevels />
      </LevelsProvider>
    </>
  )
}
