import React from 'react'
import { Link } from 'react-router-dom'

interface Props {}

const SideBar = (props: Props) => {
  return (
    <nav className="block py-6 px-4 top-0 bottom-0 w-64 bg-surface shadow-card border-r border-slate-200 left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
        
        <button className="md:hidden flex items-center justify-center cursor-pointer text-textMuted w-6 h-10 border-l-0 border-r border-t border-b border-solid border-slate-200 text-xl leading-none bg-surface rounded-r border border-transparent absolute top-1/2 -right-24-px focus:outline-none z-9998">
            <i className="fas fa-ellipsis-v"></i>
        </button>

        <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
            <div className="flex bg-surface flex-col items-stretch opacity-100 relative mt-2 overflow-y-auto overflow-x-hidden h-auto z-40 flex-1 rounded w-full">
            
            <h6 className="px-4 text-textMuted text-xs uppercase font-extrabold tracking-wider mb-3">
              Financials
            </h6>

            <div className="md:flex-col md:min-w-full flex flex-col list-none gap-2">
                <Link 
                    to="company-profile" 
                    className="flex items-center gap-3 md:min-w-full text-textMuted hover:text-brandBlue hover:bg-brandBlueLight rounded-xl text-sm font-bold px-4 py-3 no-underline transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-brandBlue group-hover:scale-110 transition-all duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="tracking-wide uppercase">Company Profile</span>
                </Link>
                
                <Link 
                    to="income-statement" 
                    className="flex items-center gap-3 md:min-w-full text-textMuted hover:text-brandBlue hover:bg-brandBlueLight rounded-xl text-sm font-bold px-4 py-3 no-underline transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-brandBlue group-hover:scale-110 transition-all duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="tracking-wide uppercase">Income Statement</span>
                </Link>
            </div>
        </div>
        </div>
    </nav>
  )
}

export default SideBar