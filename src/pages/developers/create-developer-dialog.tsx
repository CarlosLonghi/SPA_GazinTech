import { useContextSelector } from '@fluentui/react-context-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
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

const createDeveloperFormSchema = z.object({
  name: z.string(),
  levelId: z.string(),
  sex: z.string().length(1),
  hobby: z.string(),
})

type CreateDeveloperFormInputs = z.infer<typeof createDeveloperFormSchema>

export function CreateDeveloperDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dateTimeValue, setDateTimeValue] = useState('')

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateDeveloperFormInputs>({
    resolver: zodResolver(createDeveloperFormSchema),
  })

  const levels = useContextSelector(DevelopersContext, (context) => {
    return context.levels
  })

  async function handleCreateDeveloper(data: CreateDeveloperFormInputs) {
    try {
      const { name, levelId, sex, hobby } = data

      const birthDate = dateTimeValue
      if (!isSubmitting) {
        setDialogOpen(false)
      }

      await api.post('/desenvolvedores', {
        name,
        levelId,
        sex,
        birthDate,
        hobby,
      })

      toast.success('Desenvolvedor criado com sucesso!')
      reset()
      setDateTimeValue('')
    } catch (error) {
      toast.error('Erro ao criar um novo Desenvolvedor!')
    }
  }

  const concatenateDateTime = (dateString: string) => {
    const formattedDateTimeString = dateString + 'T00:00:00.000Z'
    setDateTimeValue(formattedDateTimeString)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default">
          Adicionar Desenvolvedor
          <Plus strokeWidth={2} className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Desenvolvedor</DialogTitle>
          <DialogDescription>Adicione um novo Desenvolvedor.</DialogDescription>
        </DialogHeader>

        <form
          id="FormCreateDeveloper"
          onSubmit={handleSubmit(handleCreateDeveloper)}
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
                Masculino
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
              <Label htmlFor="levelId">Nível</Label>

              <Controller
                control={control}
                name="levelId"
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange} {...field} required>
                      <SelectTrigger id="levelId">
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
            form="FormCreateDeveloper"
            disabled={isSubmitting}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
