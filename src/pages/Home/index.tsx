import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Task name is required.'),
  minutesAmount: zod
    .number()
    .min(5, 'Timer must be at least 5 minutes.')
    .max(60, 'Timer must be at most 60 minutes.'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const {
    activeCycle,
    secondsPassedAmount,
    createNewCycle,
    endCountdownTimer,
  } = useContext(CyclesContext)
  const newCycleFormHookData = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleFormHookData
  const isSubmitDisabled = !watch('task')
  // console.log(formState.errors.task?.message)
  // console.log(formState.errors.minutesAmount?.message)

  const handleEndCountdownTimer = () => {
    endCountdownTimer(secondsPassedAmount)
    reset()
  }

  const resetForm = () => {
    reset()
  }
  return (
    <HomeContainer>
      <form
        onSubmit={handleSubmit(createNewCycle)}
        action=""
        autoComplete="off"
      >
        <FormProvider {...newCycleFormHookData}>
          <NewCycleForm />
        </FormProvider>

        <Countdown resetForm={resetForm} />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleEndCountdownTimer}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
