import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, TaskStatus } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
  const cyclesToShow = [...cycles].reverse()

  document.title = 'Timer - History'

  return (
    <HistoryContainer>
      <h1>My History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Started</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cyclesToShow.map((cycle, index) => {
              const isTaskRunning = cycle.taskTimeElapsed === undefined
              const wasTaskCompleted =
                cycle.taskTimeElapsed === cycle.minutesAmount * 60

              return (
                <tr key={String(new Date()) + index}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {isTaskRunning ? (
                      <TaskStatus taskStatus="running">Running</TaskStatus>
                    ) : (
                      <TaskStatus
                        taskStatus={
                          wasTaskCompleted ? 'completed' : 'interrupted'
                        }
                      >
                        {wasTaskCompleted ? 'Finished' : 'Interrupted'}
                      </TaskStatus>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
