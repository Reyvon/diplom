import { FC } from "react"
import { Link, NavLink } from "react-router-dom"

const Header: FC = () => {
  const isAuth = false
  return (
    <header className='flex items-center px-4 py-4 shadow-sm bg-blue-600 backdrop-blur-sm'>
        
        <Link to={'/'}>
        home
        </Link>

        {isAuth && (
          <nav className="ml-auto mr-10">
            <ul className=" flex items-center gap-5">
              <li>
                <NavLink to={'/files'}>Files</NavLink>
              </li>
              <li>
                <NavLink to={'/posts'}>News</NavLink>
              </li>
              <li>
                <NavLink to={'/profile'}>Profile</NavLink>
              </li>
            </ul>
          </nav>
          
        )

        }
        {
          isAuth ? (
            <button className="btn">
              <span>Logout</span>
            </button>
          ): (
            <Link className="py-2 text-black ml-auto" to={'auth'}>
              Log in / Sign in
            </Link>
          )
        }
    </header>
  )
}

export default Header