import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'
import { Logo } from '../../assets/Logo'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <nav>
        <NavLink to="/">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
