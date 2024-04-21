import { Trash } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

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

import { CreateDeveloperDialog } from './create-developer-dialog'
import { EditDeveloperDialog } from './edit-developer-dialog'

export function Developers() {
  async function handleDeleteDeveloper() {
    console.log('Função deletar')
  }

  return (
    <>
      <Helmet title="Desenvolvedores" />

      <h1 className="text-2xl font-bold tracking-tight">
        Lista de Desenvolvedores
      </h1>

      <div className="flex justify-end">
        <CreateDeveloperDialog />
      </div>
      <div className="flex-1 rounded-md border border-secondary-foreground bg-secondary">
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
            <TableRow>
              <TableCell className="font-mono text-xs font-medium">
                Carlos Eduardo Souza Longhi
              </TableCell>
              <TableCell className="font-mono text-xs">Nível 1</TableCell>
              <TableCell className="font-mono  text-xs">Masculino</TableCell>
              <TableCell className="font-mono text-xs">18/03/1999</TableCell>
              <TableCell className="font-mono text-xs">25 anos</TableCell>
              <TableCell className="font-mono text-xs">Música</TableCell>
              <TableCell className="flex items-center gap-2">
                <EditDeveloperDialog />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteDeveloper}
                >
                  Excluir
                  <Trash strokeWidth={3} className="ml-2 h-3 w-3" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}
