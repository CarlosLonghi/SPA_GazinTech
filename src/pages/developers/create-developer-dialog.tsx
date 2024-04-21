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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const createDeveloperFormSchema = z.object({
  name: z.string(),
  level: z.string(),
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

  async function handleCreateDeveloper(data: CreateDeveloperFormInputs) {
    try {
      const { name, level, sex, hobby } = data

      const birthDate = dateTimeValue
      if (!isSubmitting) {
        setDialogOpen(false)
      }

      await new Promise((resolve) => setTimeout(resolve, 800))

      toast.success('Desenvolvedor criado com sucesso!')
      console.log({ name, level, sex, birthDate, hobby })

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
        <Button variant="outline" size="sm">
          Novo Nível
          <Plus strokeWidth={3} className="ml-2 h-3 w-3" />
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

              <RadioGroup id="sex" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="M" id="M" {...register('sex')} />
                  <Label htmlFor="M">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="F" id="F" {...register('sex')} />
                  <Label htmlFor="F">Feminino</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="level">Nível</Label>

              <Controller
                control={control}
                name="level"
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange} {...field} required>
                      <SelectTrigger id="level">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nivel 1">Nível 1</SelectItem>
                        <SelectItem value="nivel 2">Nível 2</SelectItem>
                        <SelectItem value="nivel 3">Nível 3</SelectItem>
                      </SelectContent>
                    </Select>
                  )
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <Label htmlFor="birthDate">Aniversário</Label>

              <input
                id="birthDate"
                type="date"
                value={dateTimeValue.substring(0, 10)}
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
