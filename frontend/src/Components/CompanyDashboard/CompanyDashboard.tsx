import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
    children: React.ReactNode;
}

const CompanyDashboard = ({children}: Props) => {
  return (
    <div className="relative md:ml-64 bg-surfaceLight w-full min-h-screen">
        <div className="relative pt-10 pb-12 bg-brandBlue shadow-md">
            <div className="px-6 md:px-10 mx-auto w-full">
                <div className="flex flex-wrap items-center">
                    {children}
                </div>
            </div>
        </div>
        <div className="px-6 md:px-10 mx-auto w-full mt-8">
            <Outlet />
        </div>

    </div>
  )
}

export default CompanyDashboard