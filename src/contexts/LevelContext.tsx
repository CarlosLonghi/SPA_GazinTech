import { createContext } from '@fluentui/react-context-selector'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import { api } from '../libs/axios'

interface Level {
  id: string
  level: string
  created_at: string
  updated_at: string
}

interface CreateLevelInput {
  level: string
}

interface DeleteLevelId {
  id: string
}

interface LevelsContextType {
  levels: Level[]
  fetchLevels: (query?: string) => Promise<void>
  createLevel: (data: CreateLevelInput) => Promise<void>
  deleteLevel: (data: DeleteLevelId) => Promise<void>
}

interface LevelsProviderProps {
  children: ReactNode
}

export const LevelsContext = createContext({} as LevelsContextType)

export function LevelsProvider({ children }: LevelsProviderProps) {
  const [levels, setLevels] = useState<Level[]>([])

  const fetchLevels = useCallback(async () => {
    const response = await api.get('niveis')
    setLevels(response.data.levels)
  }, [])

  // teste1
  // const deleteLevel = useCallback(async (levelId: string) => {
  //   const response = await api.delete(`niveis/${levelId}`)

  //   setLevels(response.data.levels)
  // }, [])

  // async function handleDeleteLevel(levelId: string) {

  //   await api.delete(`/niveis/${levelId}`)
  //   fetchLevels()
  // }

  const createLevel = useCallback(async (data: CreateLevelInput) => {
    const { level } = data

    const response = await api.post('niveis', {
      level,
    })

    setLevels((state) => [response.data.levels, ...state])
  }, [])

  const deleteLevel = useCallback(async (data: DeleteLevelId) => {
    await api.delete(`niveis/${data}`)

    setLevels((state) => [...state])
  }, [])

  useEffect(() => {
    fetchLevels()
  }, [fetchLevels])

  return (
    <LevelsContext.Provider
      value={{ levels, fetchLevels, createLevel, deleteLevel }}
    >
      {children}
    </LevelsContext.Provider>
  )
}
