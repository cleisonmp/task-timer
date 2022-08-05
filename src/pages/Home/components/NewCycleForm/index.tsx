import {
  CycleInfoContainer,
  TaskInput,
  MinutesAmountInput,
  ActiveMinutesAmount,
} from './styles'
import { useContext } from 'react'

import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { cycles, activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()
  const suggestionsList = [
    ...new Set(cycles.map((cycle) => cycle.task)),
  ].reverse()

  return (
    <CycleInfoContainer>
      <label htmlFor="task">Working on</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder={
          activeCycle ? activeCycle.task : 'Give your project a name'
        }
        {...register('task')}
        disabled={!!activeCycle}
      />
      <datalist id="task-suggestions">
        {suggestionsList.map((suggestion, index) => {
          return <option key={index} value={suggestion} />
        })}
      </datalist>

      <label htmlFor="minutesAmount">for</label>
      {activeCycle ? (
        <ActiveMinutesAmount>{activeCycle.minutesAmount}</ActiveMinutesAmount>
      ) : (
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          step={5}
          min={5}
          max={60}
          {...register('minutesAmount', { valueAsNumber: true })}
          disabled={!!activeCycle}
        />
      )}

      <span>minutes.</span>
    </CycleInfoContainer>
  )
}
