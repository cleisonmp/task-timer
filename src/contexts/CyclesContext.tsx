import { createContext, ReactNode, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  taskTimeElapsed?: number
}

interface CyclesContextInfo {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsPassedAmount: number
  createNewCycle: (data: CreateCycleData) => void
  setSecondsPassedOnCycle: (seconds: number) => void
  endCountdownTimer: (timeElapsed: number) => void
}
export const CyclesContext = createContext({} as CyclesContextInfo)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // console.log(formState.errors.task?.message)
  // console.log(formState.errors.minutesAmount?.message)

  // useCallback(() =>
  const endCountdownTimer = (timeElapsed: number) => {
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
  }
  const createNewCycle = (data: CreateCycleData) => {
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
  }

  const setSecondsPassedOnCycle = (seconds: number) => {
    setSecondsPassedAmount(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        secondsPassedAmount,
        createNewCycle,
        setSecondsPassedOnCycle,
        endCountdownTimer,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
