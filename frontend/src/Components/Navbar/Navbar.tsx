import React from 'react'
import logo from "./logo.png"
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/useAuth'

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center">
             <img src={logo} alt="FinSeek Logo" className="h-10" />
          </Link>
          <div className="hidden lg:flex space-x-8 font-semibold">
            <Link to="/search" className="text-textMuted hover:text-brandGreen transition-colors duration-200">
              Search
            </Link>
            <a href="#" className="text-textMuted hover:text-brandGreen transition-colors duration-200">
              Markets
            </a>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {isLoggedIn() ? (
            <>
              <div className="font-semibold text-slate-700">
                Welcome, <span className="text-brandBlue">{user?.userName}</span>
              </div>
              <button
                onClick={logout}
                className="px-5 py-2 font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="font-semibold text-textMain hover:text-brandBlue transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 font-bold text-white bg-brandBlue rounded-xl hover:bg-brandBlueHover hover:shadow-lg transition-all duration-200"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar