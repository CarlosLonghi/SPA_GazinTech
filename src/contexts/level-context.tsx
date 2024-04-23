import { createContext } from '@fluentui/react-context-selector'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import { api } from '../libs/axios'

interface Level {
  id: string
  level: string
}

interface DeleteLevelId {
  id: string
}

interface LevelsContextType {
  levels: Level[]
  fetchLevels: (query?: string) => Promise<void>
  deleteLevel: (data: DeleteLevelId) => Promise<void>
}

interface LevelsProviderProps {
  children: ReactNode
}

export const LevelsContext = createContext({} as LevelsContextType)

export function LevelsProvider({ children }: LevelsProviderProps) {
  const [levels, setLevels] = useState<Level[]>([])

  const fetchLevels = useCallback(async (query?: string) => {
    const response = await api.get('niveis', {
      params: {
        q: query,
      },
    })

    setLevels(response.data.levels)
  }, [])

  const deleteLevel = useCallback(async (data: DeleteLevelId) => {
    const { id } = data
    await api.delete(`niveis/${id}`)
    setLevels([])
  }, [])

  useEffect(() => {
    fetchLevels()
  }, [levels, fetchLevels])

  return (
    <LevelsContext.Provider value={{ levels, fetchLevels, deleteLevel }}>
      {children}
    </LevelsContext.Provider>
  )
}
