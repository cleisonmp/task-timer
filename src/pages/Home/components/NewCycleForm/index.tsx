import { CycleInfoContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
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
        <option value="Sugestão de nome de projeto 4"></option>
        <option value="Sugestão de nome de projeto 5"></option>
      </datalist>

      <label htmlFor="minutesAmount">for</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>minutes.</span>
    </CycleInfoContainer>
  )
}
