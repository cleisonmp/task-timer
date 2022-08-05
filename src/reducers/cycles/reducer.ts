import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  taskTimeElapsed?: number
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

interface cyclesReducerActionProps {
  type: ActionTypes
  payload: {
    newCycle?: Cycle
    taskTimeElapsed?: number
  }
}

export function cyclesReducer(
  state: CyclesState,
  action: cyclesReducerActionProps,
) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        if (action.payload.newCycle) {
          draft.cycles.push(action.payload.newCycle)
          draft.activeCycleId = action.payload.newCycle.id
        }
      })
    }
    case ActionTypes.END_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].taskTimeElapsed =
          action.payload.taskTimeElapsed
      })
    }
    default:
      return state
  }
}
