import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  CycleInfoContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
  StopCountdownButton,
} from './styles'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Task name is required.'),
  minutesAmount: zod
    .number()
    .min(5, 'Timer must be at least 5 minutes.')
    .max(60, 'Timer must be at most 60 minutes.'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle extends NewCycleFormData {
  id: string
  startDate: Date
  status: 'running' | 'completed' | 'interrupted'
  timeElapsed?: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
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

  const handleCreateNewTask = (data: NewCycleFormData) => {
    const newCycleId = String(new Date().getTime())
    const newCycle: Cycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      status: 'running',
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycleId)
    setSecondsPassedAmount(0)
    // reset()
  }
  const handleStopCountdown = () => {
    setCycles((cyclesState) =>
      cyclesState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            status: 'interrupted',
            timeElapsed: secondsPassedAmount,
          }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
    setSecondsPassedAmount(0)
    reset()
  }
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassedAmount : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondAmount = currentSeconds % 60
  const minutesToShow = String(minutesAmount).padStart(2, '0')
  const secondsToShow = String(secondAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setSecondsPassedAmount(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      })
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesToShow}: ${secondsToShow} - ${activeCycle.task}`
    }
  }, [minutesToShow, secondsToShow, activeCycle])
  // {activeCycle ? <h1>Title</h1> : <h1>xx</h1>}

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <CycleInfoContainer>
          <label htmlFor="task">Working on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give your project a name"
            {...register('task')}
            disabled={!!activeCycle}
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
            disabled={!!activeCycle}
          />

          <span>minutes.</span>
        </CycleInfoContainer>

        <CountdownContainer>
          <span>{minutesToShow[0]}</span>
          <span>{minutesToShow[1]}</span>
          <Separator>:</Separator>
          <span>{secondsToShow[0]}</span>
          <span>{secondsToShow[1]}</span>
        </CountdownContainer>

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
