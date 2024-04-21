import { Pen, Plus, Trash } from 'lucide-react'
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

export function Levels() {
  return (
    <>
      <Helmet title="Níveis" />

      <h1 className="text-2xl font-bold tracking-tight">Lista de Níveis</h1>

      <div className="flex justify-end">
        <Button variant="default" size="sm">
          Novo Nível
          <Plus strokeWidth={3} className="ml-2 h-3 w-3" />
        </Button>
      </div>
      <div className="flex-1 rounded-md border border-secondary-foreground bg-secondary">
        <Table>
          <TableCaption>Níveis</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-80 text-foreground">Código</TableHead>
              <TableHead className="text-foreground">Nível</TableHead>
              <TableHead className="w-28">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs font-medium">
                307bd9db-c953-482d-85cd-19536213cddd
              </TableCell>

              <TableCell>Nível 1</TableCell>
              <TableCell className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Editar
                  <Pen strokeWidth={3} className="ml-2 h-3 w-3" />
                </Button>

                <Button variant="destructive" size="sm">
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
