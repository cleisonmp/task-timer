import { createContext, ReactNode, useReducer, useState } from 'react'

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

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0)
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      console.log(action.type)
      console.log(action.payload)

      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          setSecondsPassedAmount(0)
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  taskTimeElapsed: action.payload.taskTimeElapsed,
                }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // console.log(formState.errors.task?.message)
  // console.log(formState.errors.minutesAmount?.message)

  // useCallback(() =>
  const endCountdownTimer = (timeElapsed: number) => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
        taskTimeElapsed: timeElapsed,
      },
    })

    // setCycles((cyclesState) =>
    //   cyclesState.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return {
    //         ...cycle,
    //         taskTimeElapsed: timeElapsed,
    //       }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    // setActiveCycleId(null)
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
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
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
