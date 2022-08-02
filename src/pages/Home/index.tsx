import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  TaskInfoContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <TaskInfoContainer>
          <label htmlFor="task">Working on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give your project a name"
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
          />

          <span>minutes.</span>
        </TaskInfoContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
