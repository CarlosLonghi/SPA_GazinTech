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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const editDeveloperFormSchema = z.object({
  name: z.string(),
  level: z.string(),
  sex: z.string().length(1),
  hobby: z.string(),
})

type EditDeveloperFormInputs = z.infer<typeof editDeveloperFormSchema>

export function EditDeveloperDialog() {
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

  async function handleEditDeveloper(data: EditDeveloperFormInputs) {
    try {
      const { name, level, sex, hobby } = data

      const birthDate = dateTimeValue
      if (!isSubmitting) {
        setDialogOpen(false)
      }

      await new Promise((resolve) => setTimeout(resolve, 800))

      toast.success('Desenvolvedor atualizado com sucesso!')
      console.log({ name, level, sex, birthDate, hobby })

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
