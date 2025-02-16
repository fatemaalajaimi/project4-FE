import { NavLink } from 'react-router-dom'

const NavBar = ({ logOut, user }) => {
  const activeLinkStyle = { color: '#0A66C2', fontWeight: 'bold' }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          to="/"
          style={{ color: '#0A66C2', fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          Job Portal
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
              >
                Home
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/profile"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/jobs"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    onClick={logOut}
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    Log out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/auth/signin"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/auth/signup"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
