import { useContextSelector } from '@fluentui/react-context-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pen } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DevelopersContext } from '@/contexts/developer-context'
import { api } from '@/libs/axios'

const editDeveloperFormSchema = z.object({
  name: z.string(),
  levelId: z.string(),
  sex: z.string().length(1),
  hobby: z.string(),
})

const editDeveloperId = z.object({
  id: z.string(),
})

type EditDeveloperFormInputs = z.infer<typeof editDeveloperFormSchema>
type EditDeveloperId = z.infer<typeof editDeveloperId>

export function EditDeveloperDialog({ id }: EditDeveloperId) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dateTimeValue, setDateTimeValue] = useState('')

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditDeveloperFormInputs>({
    resolver: zodResolver(editDeveloperFormSchema),
  })

  const levels = useContextSelector(DevelopersContext, (context) => {
    return context.levels
  })

  async function handleEditDeveloper(data: EditDeveloperFormInputs) {
    try {
      const { name, levelId, sex, hobby } = data

      const birthDate = dateTimeValue
      if (!isSubmitting) {
        setDialogOpen(false)
      }

      await api.put(`/desenvolvedores/${id}`, {
        name,
        levelId,
        sex,
        hobby,
        birthDate,
      })

      toast.success('Desenvolvedor atualizado com sucesso!')
      reset()
      setDateTimeValue('')
    } catch (error) {
      toast.error('Erro ao atualizar o Desenvolvedor!')
    }
  }

  const concatenateDateTime = (dateString: string) => {
    const formattedDateTimeString = dateString + 'T00:00:00.000Z'
    setDateTimeValue(formattedDateTimeString)
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
          <DialogTitle>Editar Desenvolvedor</DialogTitle>
          <DialogDescription>
            Alterar informações do Desenvolvedor.
          </DialogDescription>
        </DialogHeader>

        <form
          id="FormEditDeveloper"
          onSubmit={handleSubmit(handleEditDeveloper)}
        >
          <div className="grid gap-2 space-y-2 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                className="col-span-3"
                placeholder="Nome Desenvolvedor"
                required
                {...register('name')}
              />
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="sex">Sexo</Label>

              <Label
                className="flex cursor-pointer items-center gap-1"
                htmlFor="men"
              >
                <input {...register('sex')} type="radio" value="M" id="men" />
                <span>Masculino</span>
              </Label>
              <Label
                className="flex cursor-pointer items-center gap-1"
                htmlFor="woman"
              >
                <input {...register('sex')} type="radio" value="F" id="woman" />
                Feminino
              </Label>
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="level">Nível</Label>

              <Controller
                control={control}
                name="levelId"
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange} {...field} required>
                      <SelectTrigger id="level">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((levelData) => (
                          <SelectItem key={levelData.id} value={levelData.id}>
                            {levelData.level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="birthDate">Data de Nascimento</Label>

              <input
                id="birthDate"
                type="date"
                min="1900-01-01"
                max="2100-12-31"
                onChange={(e) => concatenateDateTime(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="hobby">Hobby</Label>
              <Input
                id="hobby"
                className="col-span-3"
                placeholder="Esportes, etc..."
                required
                {...register('hobby')}
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

          <Button
            type="submit"
            form="FormEditDeveloper"
            disabled={isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
