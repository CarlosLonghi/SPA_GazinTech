import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
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
const createLevelFormSchema = z.object({
  level: z.string(),
})

type CreateLevelFormInputs = z.infer<typeof createLevelFormSchema>

export function CreateLevelDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateLevelFormInputs>({
    resolver: zodResolver(createLevelFormSchema),
  })

  async function handleCreateLevel(data: CreateLevelFormInputs) {
    try {
      const { level } = data

      if (!isSubmitting) {
        setDialogOpen(false)
      }

      await new Promise((resolve) => setTimeout(resolve, 800))

      toast.success('Nível criado com sucesso!')
      console.log(level)
      reset()
    } catch (error) {
      toast.error('Erro ao criar um novo Nível!')
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Novo Nível
          <Plus strokeWidth={3} className="ml-2 h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nível</DialogTitle>
          <DialogDescription>
            Crie um nível para vincular ao Desenvolvedor.
          </DialogDescription>
        </DialogHeader>
        <form id="FormCreateLevel" onSubmit={handleSubmit(handleCreateLevel)}>
          <div className="grid gap-2 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Nível
              </Label>
              <Input
                id="level"
                placeholder="Nível Exemplo"
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

          <Button type="submit" form="FormCreateLevel" disabled={isSubmitting}>
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
