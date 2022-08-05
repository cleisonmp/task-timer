/* eslint-disable no-unused-vars */
import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  END_CURRENT_CYCLE = 'END_CURRENT_CYCLE',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function endCountdownTimerAction(taskTimeElapsed: number) {
  return {
    type: ActionTypes.END_CURRENT_CYCLE,
    payload: {
      taskTimeElapsed,
    },
  }
}
