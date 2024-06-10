import { FC } from "react"
import { Link, NavLink } from "react-router-dom"

const Header: FC = () => {
  const isAuth = true
  return (
    <header className='flex items-center justify-between px-4 py-4 shadow-sm bg-blue-600 backdrop-blur-sm'>
        
        <Link to={'/'}>
        home
        </Link>

        {isAuth && (
          <nav>
            <ul className="ml-auto mr-10 flex items-center gap-5">
              <li>
                <NavLink to={'/auth'}>Auth</NavLink>
              </li>
              <li>
                <NavLink to={'/'}>Files</NavLink>
              </li>
              <li>
                <NavLink to={'/profile'}>Profile</NavLink>
              </li>
            </ul>
          </nav>
          
        )

        }
    </header>
  )
}

export default Header