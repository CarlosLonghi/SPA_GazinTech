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
import { DevelopersContext } from '@/contexts/developer-context'

import { CreateDeveloperDialog } from './create-developer-dialog'
import { EditDeveloperDialog } from './edit-developer-dialog'

const deleteDeveloperId = z.object({
  id: z.string(),
})

type DeleteDeveloperlId = z.infer<typeof deleteDeveloperId>

export function ListDevelopers() {
  const developers = useContextSelector(DevelopersContext, (context) => {
    return context.developers
  })

  //   const levels = useContextSelector(DevelopersContext, (context) => {
  //     return context.levels
  //   })

  const deleteLevel = useContextSelector(DevelopersContext, (context) => {
    return context.deleteDeveloper
  })

  async function handleDeleteDeveloper({ id }: DeleteDeveloperlId) {
    try {
      await deleteLevel({ id })
      toast.success('Nível deletado com sucesso!')
    } catch (error) {
      const errorResponse = error as Error
      const errorMessage = errorResponse.message

      if (errorMessage === 'Request failed with status code 400') {
        return toast.error('Nível Vinculado há um desenvolvedor!')
      }
      toast.error('Erro ao deletar o nível.')
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <CreateDeveloperDialog />
      </div>
      <div className="flex-1 rounded-md border border-secondary-foreground bg-secondary">
        {developers ? (
          <Table>
            <TableCaption>Desenvolvedores</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-24">Nível</TableHead>
                <TableHead className="w-24">Sexo</TableHead>
                <TableHead className="w-24">Data Nascimento</TableHead>
                <TableHead className="w-24">Idade</TableHead>
                <TableHead className="w-24">Hobby</TableHead>
                <TableHead className="w-28">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {developers.map((developerData) => (
                <TableRow key={String(developerData.id)}>
                  <TableCell className="font-mono text-xs font-medium">
                    {developerData.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {developerData.level_id}
                  </TableCell>
                  <TableCell className="font-mono  text-xs">
                    {developerData.sex}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {developerData.birth_date}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {developerData.age} anos
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {developerData.hobby}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <EditDeveloperDialog />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteDeveloper(developerData)}
                    >
                      Excluir
                      <Trash strokeWidth={3} className="ml-2 h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h4 className="text-1xl font-medium tracking-tight">
            Nenhum Desenvolvedor Cadastrado.
          </h4>
        )}
      </div>
    </>
  )
}
