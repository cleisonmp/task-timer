import { FileX, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { PageContainer } from './styles'

export function PageNotFound() {
  return (
    <PageContainer>
      <div>
        <FileX size={32} />
        <h1>Page Not Found</h1>
      </div>

      <NavLink to="/" title="Timer">
        <div>
          <Timer size={24} />
          Return to home
        </div>
      </NavLink>
    </PageContainer>
  )
}
