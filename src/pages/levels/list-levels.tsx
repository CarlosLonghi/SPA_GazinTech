import { useContextSelector } from '@fluentui/react-context-selector'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { LevelsContext } from '../../contexts/level-context'
import { CreateLevelDialog } from './create-level-dialog'
import { EditLevelDialog } from './edit-level-dialog'

const deleteLevelId = z.object({
  id: z.string(),
})

type DeleteLevelId = z.infer<typeof deleteLevelId>

export function ListLevels() {
  const levels = useContextSelector(LevelsContext, (context) => {
    return context.levels
  })

  const deleteLevel = useContextSelector(LevelsContext, (context) => {
    return context.deleteLevel
  })

  async function handleDeleteLevel({ id }: DeleteLevelId) {
    try {
      await deleteLevel({ id })
      toast.success('Nível deletado com sucesso!')
    } catch (error) {
      const errorResponse = error as Error
      const errorMessage = errorResponse.message
      if (errorMessage === 'Request failed with status code 400') {
        return toast.error('Nível Vinculado há um desenvolvedor!')
      } else {
        toast.error('Erro ao deletar o nível.')
      }
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <CreateLevelDialog />
      </div>

      <div className="flex-1 rounded-md bg-secondary">
        <Table>
          <TableCaption>Níveis</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-56 text-foreground">Nível</TableHead>
              <TableHead className="text-foreground">Código</TableHead>
              <TableHead className="w-28">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {levels.map((levelData) => (
              <TableRow key={String(levelData.level)}>
                <TableCell>{levelData.level}</TableCell>
                <TableCell className="font-mono text-xs font-medium">
                  {levelData.id}
                </TableCell>

                <TableCell className="flex items-center gap-2">
                  <EditLevelDialog id={levelData.id} />

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteLevel(levelData)}
                  >
                    Excluir
                    <Trash strokeWidth={3} className="ml-2 h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
