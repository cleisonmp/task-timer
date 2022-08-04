import { useState, useCallback, createContext } from 'react'
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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Task name is required.'),
  minutesAmount: zod
    .number()
    .min(1, 'Timer must be at least 5 minutes.')
    .max(60, 'Timer must be at most 60 minutes.'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle extends NewCycleFormData {
  id: string
  startDate: Date
  taskTimeElapsed?: number
}
interface CyclesContextInfo {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsPassedAmount: number
  setSecondsPassedOnCycle: (seconds: number) => void
  endCountdownTimer: (timeElapsed: number) => void
}
export const CyclesContext = createContext({} as CyclesContextInfo)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0)
  const newCycleFormHookData = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleFormHookData
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const isSubmitDisabled = !watch('task')
  // console.log(formState.errors.task?.message)
  // console.log(formState.errors.minutesAmount?.message)

  const endCountdownTimer = useCallback(
    (timeElapsed: number) => {
      setCycles((cyclesState) =>
        cyclesState.map((cycle) => {
          if (cycle.id === activeCycleId) {
            return {
              ...cycle,
              taskTimeElapsed: timeElapsed,
            }
          } else {
            return cycle
          }
        }),
      )
      setActiveCycleId(null)
      setSecondsPassedAmount(0)
      reset()
    },
    [activeCycleId, reset],
  )
  const handleCreateNewTask = (data: NewCycleFormData) => {
    const newCycleId = String(new Date().getTime())
    const newCycle: Cycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycleId)
    setSecondsPassedAmount(0)
    // reset()
  }
  const handleStopCountdown = () => {
    endCountdownTimer(secondsPassedAmount)
  }
  const setSecondsPassedOnCycle = (seconds: number) => {
    setSecondsPassedAmount(seconds)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            secondsPassedAmount,
            setSecondsPassedOnCycle,
            endCountdownTimer,
          }}
        >
          <FormProvider {...newCycleFormHookData}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleStopCountdown}>
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
