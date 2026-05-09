import React from 'react'
import { NavLink } from 'react-router-dom'

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
                
                <NavLink 
                    to="company-profile" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 md:min-w-full rounded-xl text-sm font-bold px-4 py-3 no-underline transition-all duration-200 group ${
                            isActive 
                                ? "bg-brandBlue text-white shadow-md" 
                                : "text-textMuted hover:text-brandBlue hover:bg-brandBlueLight"
                        }`
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="tracking-wide uppercase">Company Profile</span>
                </NavLink>
                
                <NavLink 
                    to="income-statement" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 md:min-w-full rounded-xl text-sm font-bold px-4 py-3 no-underline transition-all duration-200 group ${
                            isActive 
                                ? "bg-brandBlue text-white shadow-md" 
                                : "text-textMuted hover:text-brandBlue hover:bg-brandBlueLight"
                        }`
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="tracking-wide uppercase">Income Statement</span>
                </NavLink>
                
                <NavLink 
                    to="balance-sheet" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 md:min-w-full rounded-xl text-sm font-bold px-4 py-3 no-underline transition-all duration-200 group ${
                            isActive 
                                ? "bg-brandBlue text-white shadow-md" 
                                : "text-textMuted hover:text-brandBlue hover:bg-brandBlueLight"
                        }`
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L5.237 7.58l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 014 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L8 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
                    </svg>
                    <span className="tracking-wide uppercase">Balance Sheet</span>
                </NavLink>

                <NavLink 
                    to="cashflow-statement" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 md:min-w-full rounded-xl text-sm font-bold px-4 py-3 no-underline transition-all duration-200 group ${
                            isActive 
                                ? "bg-brandBlue text-white shadow-md" 
                                : "text-textMuted hover:text-brandBlue hover:bg-brandBlueLight"
                        }`
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4h16V6a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm2 0h8v4H8v-4z" clipRule="evenodd" />
                    </svg>
                    <span className="tracking-wide uppercase">Cashflow Statement</span>
                </NavLink>

                <NavLink 
                    to="financial-trends" 
                    className={({ isActive }) => 
                        `flex items-center gap-3 md:min-w-full rounded-xl text-sm font-bold px-4 py-3 no-underline transition-all duration-200 group ${
                            isActive 
                                ? "bg-brandBlue text-white shadow-md" 
                                : "text-textMuted hover:text-brandBlue hover:bg-brandBlueLight"
                        }`
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="tracking-wide uppercase">Financial Trends</span>
                </NavLink>
                
            </div>
        </div>
        </div>
    </nav>
  )
}

export default SideBar