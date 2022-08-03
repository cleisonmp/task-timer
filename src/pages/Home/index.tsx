import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  TaskInfoContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Task name is required.'),
  minutesAmount: zod
    .number()
    .min(5, 'Timer must be at least 5 minutes.')
    .max(60, 'Timer must be at most 60 minutes.'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const isSubmitDisabled = !watch('task')
  // console.log(formState.errors.task?.message)
  // console.log(formState.errors.minutesAmount?.message)

  function handleCreateNewTask(data: NewCycleFormData) {
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <TaskInfoContainer>
          <label htmlFor="task">Working on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give your project a name"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Sugestão de nome de projeto 1"></option>
            <option value="Sugestão de nome de projeto 2"></option>
            <option value="Sugestão de nome de projeto 3"></option>
            <option value="Sugestão de nome de projeto 4"></option>
            <option value="Sugestão de nome de projeto 5"></option>
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </TaskInfoContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
