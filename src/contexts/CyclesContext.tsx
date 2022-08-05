import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  endCountdownTimerAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@cmp-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return initialState
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsPassedAmount, setSecondsPassedAmount] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@cmp-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  // console.log(formState.errors.task?.message)
  // console.log(formState.errors.minutesAmount?.message)

  // useCallback(() =>
  const endCountdownTimer = (timeElapsed: number) => {
    dispatch(endCountdownTimerAction(timeElapsed))

    /* {
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
        taskTimeElapsed: timeElapsed,
      },
    }) */

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
    dispatch(addNewCycleAction(newCycle))
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
