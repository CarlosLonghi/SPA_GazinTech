import { zodResolver } from '@hookform/resolvers/zod'
import { Pen } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const editLevelFormSchema = z.object({
  level: z.string(),
})

type EditLevelFormInputs = z.infer<typeof editLevelFormSchema>

export function EditLevelDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditLevelFormInputs>({
    resolver: zodResolver(editLevelFormSchema),
  })

  async function handleEditLevel(data: EditLevelFormInputs) {
    try {
      const { level } = data

      if (!isSubmitting) {
        setDialogOpen(false)
      }

      await new Promise((resolve) => setTimeout(resolve, 800))

      console.log(level)
      toast.success('Nível alterado com sucesso!')
      reset()
    } catch (error) {
      toast.error('Erro ao atualizar o Nível!')
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
          <Pen strokeWidth={3} className="ml-2 h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Nível</DialogTitle>
          <DialogDescription>Altere o nome do Nível.</DialogDescription>
        </DialogHeader>
        <form id="FormEditLevel" onSubmit={handleSubmit(handleEditLevel)}>
          <div className="grid gap-2 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Nível
              </Label>
              <Input
                id="level"
                defaultValue="Nível Exemplo"
                className="col-span-3"
                required
                {...register('level')}
              />
            </div>
          </div>
        </form>
        <DialogFooter className="flex items-center gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="reset">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" form="FormEditLevel" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
