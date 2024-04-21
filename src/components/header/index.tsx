import { Gauge, Home, Users } from 'lucide-react'

import logoGazinTech from '../../assets/logo.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <div className="border-b">
      <div className="m-auto flex max-w-[64rem] items-center justify-start gap-16 px-8 py-6">
        <a
          href="https://gazintech.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="w-80" src={logoGazinTech} alt="Logo da Gazin Tech" />
        </a>
        <nav className="flex items-center space-x-5 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-5 w-5" />
            Home
          </NavLink>

          <NavLink to="/desenvolvedores">
            <Users className="h-5 w-5" />
            Desenvolvedores
          </NavLink>

          <NavLink to="/niveis">
            <Gauge className="h-5 w-5" />
            Níveis
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
