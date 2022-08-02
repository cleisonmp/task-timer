import { HistoryContainer, HistoryList, TaskStatus } from './styles'

export function History() {
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
            <tr>
              <td>Task</td>
              <td>30 minutes</td>
              <td>2 months ago</td>
              <td>
                <TaskStatus taskStatus="completed">Finished</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>30 minutes</td>
              <td>2 months ago</td>
              <td>
                <TaskStatus taskStatus="interrupted">interrupted</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>30 minutes</td>
              <td>2 months ago</td>
              <td>
                <TaskStatus taskStatus="running">running</TaskStatus>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
