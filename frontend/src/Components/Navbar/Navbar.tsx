import React, { useState } from 'react'
import logo from "./logo.png"
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/useAuth'

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm relative">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
             <img src={logo} alt="FinSeek Logo" className="h-10" />
          </Link>
          <div className="hidden lg:flex space-x-8 font-semibold">
            <Link to="/search" className="text-slate-500 hover:text-brandBlue transition-colors duration-200">
              Search
            </Link>
            {isLoggedIn() && (
              <Link to="/portfolio" className="text-slate-500 hover:text-brandBlue transition-colors duration-200">
                Portfolio
              </Link>
            )}
            <Link to="/markets" className="text-slate-500 hover:text-brandBlue transition-colors duration-200">
              Markets
            </Link>
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

        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-slate-600 hover:text-brandBlue focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
      </div>
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-6 flex flex-col space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-4 font-semibold text-lg">
            <Link to="/search" onClick={closeMenu} className="text-slate-600 hover:text-brandBlue transition-colors">
              Search
            </Link>
            {isLoggedIn() && (
              <Link to="/portfolio" onClick={closeMenu} className="text-slate-600 hover:text-brandBlue transition-colors">
                Portfolio
              </Link>
            )}
            <Link to="/markets" onClick={closeMenu} className="text-slate-600 hover:text-brandBlue transition-colors">
              Markets
            </Link>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col space-y-4">
            {isLoggedIn() ? (
              <>
                <div className="font-semibold text-slate-700 text-center">
                  Welcome, <span className="text-brandBlue">{user?.userName}</span>
                </div>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="w-full px-5 py-3 font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={closeMenu}
                  className="w-full text-center py-2 font-semibold text-textMain hover:text-brandBlue transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="w-full text-center px-6 py-3 font-bold text-white bg-brandBlue rounded-xl hover:bg-brandBlueHover transition-colors shadow-sm"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar