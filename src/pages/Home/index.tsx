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
          <TaskInput id="task" placeholder="Give your project a name" />

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
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
