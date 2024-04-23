import { createContext } from '@fluentui/react-context-selector'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import { api } from '../libs/axios'

interface Developer {
  id: string
  name: string
  level_id: string
  level_name?: string
  sex: string
  hobby: string
  birth_date: string
  age: number
}

interface Level {
  id: string
  level: string
}

interface DeleteDeveloperId {
  id: string
}

interface DevelopersContextType {
  developers: Developer[]
  levels: Level[]
  fetchDevelopers: (query?: string) => Promise<void>
  fetchLevels: (query?: string) => Promise<void>
  deleteDeveloper: (data: DeleteDeveloperId) => Promise<void>
}

interface DevelopersProviderProps {
  children: ReactNode
}

interface LevelsMap {
  [key: string]: Level
}

export const DevelopersContext = createContext({} as DevelopersContextType)

export function DevelopersProvider({ children }: DevelopersProviderProps) {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [levels, setLevels] = useState<Level[]>([])

  const fetchDevelopers = useCallback(async (query?: string) => {
    const response = await api.get('desenvolvedores', {
      params: {
        q: query,
      },
    })

    const developersData = response.data.developers

    const levelsResponse = await api.get('niveis')
    const levelsData = levelsResponse.data.levels

    const levelsMap = levelsData.reduce((acc: LevelsMap, level: Level) => {
      acc[level.id] = level
      return acc
    }, {})

    const developersWithLevels = developersData.map((developer: Developer) => ({
      ...developer,
      level_name: levelsMap[developer.level_id]?.level || 'Nível desconhecido',
    }))

    setDevelopers(developersWithLevels)
  }, [])

  const fetchLevels = useCallback(async (query?: string) => {
    const response = await api.get('niveis', {
      params: {
        q: query,
      },
    })

    setLevels(response.data.levels)
  }, [])

  const deleteDeveloper = useCallback(
    async (data: DeleteDeveloperId) => {
      const { id } = data
      await api.delete(`desenvolvedores/${id}`)
      fetchDevelopers()
    },
    [fetchDevelopers],
  )

  useEffect(() => {
    fetchDevelopers(`SELECT developers.name, developers.sex, developers.hobby, developers.birth_date,  developers.age, levels.level
    FROM developers
    INNER JOIN levels ON developers.level_id = levels.id`)
    fetchLevels()
  }, [developers, fetchDevelopers, fetchLevels])

  return (
    <DevelopersContext.Provider
      value={{
        developers,
        levels,
        fetchDevelopers,
        fetchLevels,
        deleteDeveloper,
      }}
    >
      {children}
    </DevelopersContext.Provider>
  )
}
